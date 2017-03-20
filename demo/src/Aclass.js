// This is a class to showcase how to test functions and methods of a Class.
// The test file test/unit/Aclass-test.js will show how to test these methods

import fetch from 'node-fetch';

// Just Hardcode URLS for testing purposes
const services = {
  auth_service: 'https://auth-dev.lifeletters.xyz',
  consult_service : 'https://consult-dev.lifeletters.xyz'
}

const endpoints = {
  login : '/login',
  devices: '/devices',
  health: '/health'
}

export default class Aclass {

  constructor(){

    // Empty state but placeholder to show what we expect
    this.state = {
      patient : undefined,
      headers: {
        Authorization : undefined
      },
      files: undefined,
      devices: undefined,
      alive: false
    };

    this.add = a => b => {
      return a + b;
    }

    this.addOne = this.add(1);
    this.addTwo = this.add(2);

    // Helpers
    this.toJson = r=>r.json();

    // Here are example of REAL http calls for integration Testing
    // These are backend calls to demonstrate serverside testing ability

    // ENV vars TEST_USER / TEST_PASS are used here
    this.login = (user,pass) => {

      return fetch(services.auth_service+endpoints.login, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "username": user,
          "password": pass
        })
      })
      .then(this.toJson)
      .then(json=>{
        this.state.headers.Authorization = json.access_token;
        return json;
      });

    }

    // TODO: THIS HAS BEEN DEPRECATED AS PART OF v1 LEGACY
    this.fetchDevices = () => {
      return fetch(services.consult_service+endpoints.devices, {
        method: 'GET',
        headers: this.state.headers
      })
      .then(this.toJson)
      .then((json) => {
        this.state.devices = json.devices;
        return json;
      });
    }

    this.checkConsultHealth = () => {
      return fetch(services.consult_service+endpoints.health)
      .then(this.toJson)
      .then((json) => {
        this.state.alive = json.alive;
        return json;
      })
    }

  }

}
