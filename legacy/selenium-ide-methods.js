/**
 * These 2 methods will convert tests from the selenium IDE firefox plugin into javascript files and run them in wdSync.
 * We made a decision to not use this method as testing for maintainability issues and prefer all tests to be written in web-driver javacsript.
 * Code is parked in this file and not maintained but for your future reference.
 */


 // Selenium HTML to js exporter using a converter library
 // https://github.com/flyingfisher/selenium-html-js-converter
 export const convertHtmlFileToJsFile = (test_scripts_dir, exports_dir) => {

   // Store list of tests so we can return it;
   var list_of_tests = new Array();

   // Convert your tests
   fs.readdirSync(test_scripts_dir).map((file)=>{
     if(file.substr(-5) === '.html'){

       // Convert the file and save it into exports folder
       console.log('converting', file);
       const output_fileName = `${exports_dir}\/${file.split('.')[0]}.js`;
       converter.convertHtmlFileToJsFile(`${test_scripts_dir}\/${file}`, output_fileName);

       // Push it into exported array
       list_of_tests.push(output_fileName);
     }
   })

   return list_of_tests;

 };

 // Runs tests created by selemium IDE.
 // Expects config like this
 // {
 //  selenium_server_remote: xxxxx
 //  browser_name: xxxxx
 // }
 export const runIDEtests = (config, list_of_test_functions , done) =>{

   // Cheap way to check if there is even a host
   if(config.selenium_server_remote){
     ping.sys.probe(config.selenium_server_remote, function(isAlive){
       if(!isAlive){
         console.log(`selenium_server_remote ${config.selenium_server_remote} cannot be reached`);
         process.exit(1);
       }
     });
   }

   const client = wdSync.remote(config.selenium_server_remote || undefined),
         browser = client.browser,
         sync = client.sync;

   sync(function(){
     browser.init( { browserName: config.browser_name} );
     for(var test of list_of_test_functions){
       console.log(`Test Begin : ${test.name}`);
       test(browser);
       console.log(colors.green(`Test Pass✓ : ${test.name}`));
     }
     browser.quit();
     // Callback, useful for mocha
     if(typeof done === 'function') done();
   });
 }
