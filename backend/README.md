# ARBIE API DOCUMENTATION

```
Legend:

[Placeholder]
1 <-- true
0 <-- false
```

### Start Mongo & Server
```
location: /backend/db

//Windows
c:/'program files'/mongodb/server/3.4/bin/mongod.exe --dbpath [Folder you want to store the data]

//Mac 
mongod --dbpath [Folder you want to store the data]
```
```
//Install Modules from /backend
npm i
```
```
//Start server from /backend
npm start
```
---
## DATABASE API COMMANDS

### Create A New Exchange
  ```javascript
  axios.post('[Server Address]/create/exchange', { 
     name: ["Exchange Name"]
  }); // returns 1 | 0 
  ```
### Create A New Currency Entry 
  ```javascript
  axios.post('[Server Address]/create/currency', { 
    exchange: ["Exchange Name"], 
    name: ["Currency Name"],
    bid: [Bid Price],
    ask: [Ask Price],
    timestamp: [TimeStamp]
  }); // returns 1 | 0
  ```
### Create A New Arbitrage Entry
  ```javascript
  axios.post('[Server Address]/create/arb', {
    buy_exchange: [Exchange Name], 
    sell_exchange: [Exchange Name], 
    currency_type: [Currency Name],
    buy_price: [Buy Price],
    sell_price: [Sell Price],
    percentage: [Arbitrage Percent]
  }); // returns 1 | 0
  ```
### Get All Exchanges From Database
  ```javascript
  axios.get('[Server Address]/show/exchanges');

  //Returns an Array of Exchange Objects With The Format:
  ```
  ``` javascript
  [
    {
        "currencies": [],
        "_id": "5a56b0d9f47b86097c875221",
        "name": "gdax"
    },
    {
        "currencies": [],
        "_id": "5a56b13dc9fdb628fcc78c0f",
        "name": "poloniex"
    }
]
  ```
### Get All Currency Entries From Database
  ```javascript
  axios.get('[Server Address]/show/currencies');

  //returns format:
  ```
  ```javascript
  [
    {
        "recieved": "2018-01-05T06:08:52.982Z",
        "_id": "5a4f1733055bce127832726a",
        "name": "BTC_USD",
        "bid": 1000,
        "ask": 1000,
        "timestamp": "00:00:00"
    },
    {
        "recieved": "2018-01-05T06:08:52.982Z",
        "_id": "5a4f173c055bce127832726b",
        "name": "BTC_USD",
        "bid": 1000,
        "ask": 1000,
        "timestamp": "00:00:00"
    },
    {
        "recieved": "2018-01-05T06:19:24.358Z",
        "_id": "5a4f23ae62e6661278d108d4",
        "name": "BTC_USD",
        "bid": 1000,
        "ask": 1000,
        "timestamp": "00:00:00"
    },
    {
        "recieved": "2018-01-05T06:19:24.358Z",
        "_id": "5a4f23b062e6661278d108d5",
        "name": "BTC_USD",
        "bid": 1000,
        "ask": 1000,
        "timestamp": "00:00:00"
    },
    {
        "recieved": "2018-01-05T06:19:24.358Z",
        "_id": "5a4f23b562e6661278d108d6",
        "name": "BTC_USD",
        "bid": 1000,
        "ask": 1000,
        "timestamp": "00:00:00"
    },
    {
        "recieved": "2018-01-05T06:19:24.358Z",
        "_id": "5a4f23bc62e6661278d108d7",
        "name": "BTC_USD",
        "bid": 1000,
        "ask": 1000,
        "timestamp": "00:00:00"
    },
    {
        "recieved": "2018-01-05T06:19:24.358Z",
        "_id": "5a4f23bd62e6661278d108d8",
        "name": "BTC_USD",
        "bid": 1000,
        "ask": 1000,
        "timestamp": "00:00:00"
    },
    {
        "recieved": "2018-01-05T06:19:24.358Z",
        "_id": "5a4f23c462e6661278d108d9",
        "name": "BTC_USD",
        "bid": 1000,
        "ask": 1000,
        "timestamp": "00:00:00"
    },
    {
        "recieved": "2018-01-05T06:19:24.358Z",
        "_id": "5a4f23c862e6661278d108da",
        "name": "BTC_USD",
        "bid": 1000,
        "ask": 1000,
        "timestamp": "00:00:00"
    },
    {
        "recieved": "2018-01-05T06:19:24.358Z",
        "_id": "5a4f23c962e6661278d108db",
        "name": "BTC_USD",
        "bid": 1000,
        "ask": 1000,
        "timestamp": "00:00:00"
    },
    {
        "recieved": "2018-01-05T06:19:24.358Z",
        "_id": "5a4f23cf62e6661278d108dc",
        "name": "BTC_USD",
        "bid": 1000,
        "ask": 1000,
        "timestamp": "00:00:00"
    },
    {
        "recieved": "2018-01-05T06:19:24.358Z",
        "_id": "5a4f23d162e6661278d108dd",
        "name": "BTC_USD",
        "bid": 1000,
        "ask": 1000,
        "timestamp": "00:00:00"
    },
    {
        "recieved": "2018-01-05T06:19:24.358Z",
        "_id": "5a4f23d762e6661278d108de",
        "name": "BTC_USD",
        "bid": 1000,
        "ask": 1000,
        "timestamp": "00:00:00"
    }
]
  ```
### Get All Arbitrages From The Database
  ```javascript
  axios.get('[Server Address]/show/arbs');

  //returns format:
  ```
  ```javascript
    [
        {
            "recieved": "2018-01-11T01:08:15.039Z",
            "found_by": "APP",
            "_id": "5a56b9317c4b991ec43b3277",
            "buy_exchange": "GDAX",
            "sell_exchange": "GEMINI",
            "timestamp": "2018-01-11T01:09:05.045Z",
            "currency_type": "BTC_USD",
            "percentage": 0.22783364268668432,
            "buy_price": 14674.59,
            "sell_price": 14708.1,
            "profit": 33.51000000000022
        },
        {
            "recieved": "2018-01-11T01:08:15.039Z",
            "found_by": "APP",
            "_id": "5a56b92c7c4b991ec43b3276",
            "buy_exchange": "GDAX",
            "sell_exchange": "GEMINI",
            "timestamp": "2018-01-11T01:09:00.002Z",
            "currency_type": "BTC_USD",
            "percentage": 0.21412810138842867,
            "buy_price": 14670,
            "sell_price": 14701.48,
            "profit": 31.479999999999563
        },
        {
            "recieved": "2018-01-11T01:08:15.039Z",
            "found_by": "APP",
            "_id": "5a56b92b7c4b991ec43b3275",
            "buy_exchange": "POLONIEX",
            "sell_exchange": "GEMINI",
            "timestamp": "2018-01-11T01:08:59.996Z",
            "currency_type": "ETH_USD",
            "percentage": 0.4135217315866405,
            "buy_price": 1314.37221613,
            "sell_price": 1319.83,
            "profit": 5.4577838699999575
        },
        {
            "recieved": "2018-01-11T01:08:15.039Z",
            "found_by": "APP",
            "_id": "5a56b9277c4b991ec43b3274",
            "buy_exchange": "GDAX",
            "sell_exchange": "GEMINI",
            "timestamp": "2018-01-11T01:08:55.077Z",
            "currency_type": "BTC_USD",
            "percentage": 0.2231675232417956,
            "buy_price": 14669.15,
            "sell_price": 14701.96,
            "profit": 32.80999999999949
        },
        {
            "recieved": "2018-01-11T01:08:15.039Z",
            "found_by": "APP",
            "_id": "5a56b9277c4b991ec43b3273",
            "buy_exchange": "POLONIEX",
            "sell_exchange": "GEMINI",
            "timestamp": "2018-01-11T01:08:55.070Z",
            "currency_type": "ETH_USD",
            "percentage": 0.3433012358783888,
            "buy_price": 1314.3722,
            "sell_price": 1318.9,
            "profit": 4.52780000000007
        },
        {
            "recieved": "2018-01-11T01:08:15.039Z",
            "found_by": "APP",
            "_id": "5a56b9217c4b991ec43b3272",
            "buy_exchange": "POLONIEX",
            "sell_exchange": "GEMINI",
            "timestamp": "2018-01-11T01:08:49.307Z",
            "currency_type": "ETH_USD",
            "percentage": 0.5991967670028191,
            "buy_price": 1310.99719384,
            "sell_price": 1318.9,
            "profit": 7.902806160000182
        }
    ]
```

### Get Exchange By ID
  ```javascript
  axios.get('[Server Address]/show/exchange/[id]');

  //returns format:
  ```
  ```javascript
    {
        "currencies": [],
        "_id": "5a56b0d9f47b86097c875221",
        "name": "gdax"
    }
  ```
### Get Currency By ID
  ```javascript
  axios.get('[Server Address]/show/currency/[id]');

  //returns format:
  ```
  ```javascript
  {
    "recieved": "2018-01-05T06:08:52.982Z",
    "_id": "5a4f173c055bce127832726b",
    "name": "BTC_USD",
    "bid": 1000,
    "ask": 1000,
    "timestamp": "00:00:00"
}
```
### Get Arbitrage By ID
  ```javascript
  axios.get('[Server Address]/show/arb/[id]');

  //returns format:
  ```
  ```javascript
{
    "recieved": "2018-01-11T01:08:15.039Z",
    "found_by": "APP",
    "_id": "5a56b9217c4b991ec43b3272",
    "buy_exchange": "POLONIEX",
    "sell_exchange": "GEMINI",
    "timestamp": "2018-01-11T01:08:49.307Z",
    "currency_type": "ETH_USD",
    "percentage": 0.5991967670028191,
    "buy_price": 1310.99719384,
    "sell_price": 1318.9,
    "profit": 7.902806160000182
}
  ```
### Remove Exchange By ID
  ```javascript
  axios.delete('[Server Address]/remove/exchange/[id]');
  //returns the removed ID
  ```
### Remove Currency By ID
  ```javascript
  axios.delete('[Server Address]/remove/currency/[id]');
  //returns the removed ID
  ```
### Remove Arbitrage By ID
  ```javascript
  axios.delete('[Server Address]/remove/arb/[id]');
  //returns the removed ID
  ```
### Remove All Exchanges & Currencies
  ```javascript
  axios.delete('[Server Address]/remove/exchanges');
  //returns 1 | 0
  ```
### Remove All Currencies 
  ```javascript
  axios.delete('[Server Address]/remove/currencies');
  //returns 1 | 0
  ```
### Remove All Arbitage
  ```javascript
  axios.delete('[Server Address]/remove/arbs');
  //return 1 | 0
  ```
## AUTHORIZATION API

### CREATE NEW USER
  ```javascript
  axios.post('/create/user', {
     //user info
  });
  ```
### LOGIN USER
```javascript
  route.post('/login', {
      username: [username],
      password: [password]
  });
```
### LOGOUT USER
```javascript
axios.get('/logout', {
    headers:{
        token: [JSON Web Token]
    }
});
```
### FIND ALL USERS
```javascript
  axios.get('/find/user/all');
```
### Find USER BY ID
```javascript
  axios.get('/find/user/[id]');
```
### VERIFY AUTHORIZATION
```javascript
  axios.get('/verify', {
      headers:{
          token: [JSON Web Token]
      }
  });
```
### REMOVE USER BY ID
```javascript
  axios.delete('/remove/user/[id]', {
      headers:{
          token: [JSON Web Token] //Verify Admin | User Account
      }
  });
```

