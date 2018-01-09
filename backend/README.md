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
        "currencies": [
            {
                "recieved": "2018-01-05T06:08:52.982Z",
                "_id": "5a4f173c055bce127832726b",
                "name": "BTC_USD",
                "bid": 1000,
                "ask": 1000,
                "timestamp": "00:00:00",
                "__v": 0
            }
        ],
        "_id": "5a4f170d055bce1278327268",
        "name": "test_exchange",
        "state": "buy",
        "__v": 1
    },
    {
        "currencies": [],
        "_id": "5a4f1714055bce1278327269",
        "name": "test_exchange",
        "state": "sell",
        "__v": 0
    },
    {
        "currencies": [
            {
                "recieved": "2018-01-05T06:19:24.358Z",
                "_id": "5a4f23c862e6661278d108da",
                "name": "BTC_USD",
                "bid": 1000,
                "ask": 1000,
                "timestamp": "00:00:00",
                "__v": 0
            },
            {
                "recieved": "2018-01-05T06:19:24.358Z",
                "_id": "5a4f23c962e6661278d108db",
                "name": "BTC_USD",
                "bid": 1000,
                "ask": 1000,
                "timestamp": "00:00:00",
                "__v": 0
            }
        ],
        "_id": "5a4f238262e6661278d108d0",
        "name": "test_exchange 2",
        "state": "sell",
        "__v": 2
    },
    {
        "currencies": [
            {
                "recieved": "2018-01-05T06:19:24.358Z",
                "_id": "5a4f23ae62e6661278d108d4",
                "name": "BTC_USD",
                "bid": 1000,
                "ask": 1000,
                "timestamp": "00:00:00",
                "__v": 0
            },
            {
                "recieved": "2018-01-05T06:19:24.358Z",
                "_id": "5a4f23b062e6661278d108d5",
                "name": "BTC_USD",
                "bid": 1000,
                "ask": 1000,
                "timestamp": "00:00:00",
                "__v": 0
            }
        ],
        "_id": "5a4f238862e6661278d108d1",
        "name": "test_exchange 2",
        "state": "buy",
        "__v": 2
    },
    {
        "currencies": [
            {
                "recieved": "2018-01-05T06:19:24.358Z",
                "_id": "5a4f23bc62e6661278d108d7",
                "name": "BTC_USD",
                "bid": 1000,
                "ask": 1000,
                "timestamp": "00:00:00",
                "__v": 0
            },
            {
                "recieved": "2018-01-05T06:19:24.358Z",
                "_id": "5a4f23bd62e6661278d108d8",
                "name": "BTC_USD",
                "bid": 1000,
                "ask": 1000,
                "timestamp": "00:00:00",
                "__v": 0
            }
        ],
        "_id": "5a4f238e62e6661278d108d2",
        "name": "test_exchange 3",
        "state": "buy",
        "__v": 2
    },
    {
        "currencies": [
            {
                "recieved": "2018-01-05T06:19:24.358Z",
                "_id": "5a4f23c462e6661278d108d9",
                "name": "BTC_USD",
                "bid": 1000,
                "ask": 1000,
                "timestamp": "00:00:00",
                "__v": 0
            }
        ],
        "_id": "5a4f239662e6661278d108d3",
        "name": "test_exchange 3",
        "state": "sell",
        "__v": 1
    }
]
  ```
### Get All BUY Exchanges From Database
  ```javascript
  axios.get('[Server Address]/show/exchanges/buy');

  //returns format:
  ```
  ```javascript
  [
    {
        "currencies": [
            {
                "recieved": "2018-01-05T06:08:52.982Z",
                "_id": "5a4f173c055bce127832726b",
                "name": "BTC_USD",
                "bid": 1000,
                "ask": 1000,
                "timestamp": "00:00:00",
                "__v": 0
            }
        ],
        "_id": "5a4f170d055bce1278327268",
        "name": "test_exchange",
        "state": "buy",
        "__v": 1
    },
    {
        "currencies": [
            {
                "recieved": "2018-01-05T06:19:24.358Z",
                "_id": "5a4f23ae62e6661278d108d4",
                "name": "BTC_USD",
                "bid": 1000,
                "ask": 1000,
                "timestamp": "00:00:00",
                "__v": 0
            },
            {
                "recieved": "2018-01-05T06:19:24.358Z",
                "_id": "5a4f23b062e6661278d108d5",
                "name": "BTC_USD",
                "bid": 1000,
                "ask": 1000,
                "timestamp": "00:00:00",
                "__v": 0
            }
        ],
        "_id": "5a4f238862e6661278d108d1",
        "name": "test_exchange 2",
        "state": "buy",
        "__v": 2
    },
    {
        "currencies": [
            {
                "recieved": "2018-01-05T06:19:24.358Z",
                "_id": "5a4f23bc62e6661278d108d7",
                "name": "BTC_USD",
                "bid": 1000,
                "ask": 1000,
                "timestamp": "00:00:00",
                "__v": 0
            },
            {
                "recieved": "2018-01-05T06:19:24.358Z",
                "_id": "5a4f23bd62e6661278d108d8",
                "name": "BTC_USD",
                "bid": 1000,
                "ask": 1000,
                "timestamp": "00:00:00",
                "__v": 0
            }
        ],
        "_id"
  ```
### Get ALL SELL Exchanges From Database
  ```javascript
  axios.get('[Server Address]/show/exchanges/sell');

  //returns format:
  ```
  ```javascript
  [
    {
        "currencies": [],
        "_id": "5a4f1714055bce1278327269",
        "name": "test_exchange",
        "state": "sell",
        "__v": 0
    },
    {
        "currencies": [
            {
                "recieved": "2018-01-05T06:19:24.358Z",
                "_id": "5a4f23c862e6661278d108da",
                "name": "BTC_USD",
                "bid": 1000,
                "ask": 1000,
                "timestamp": "00:00:00",
                "__v": 0
            },
            {
                "recieved": "2018-01-05T06:19:24.358Z",
                "_id": "5a4f23c962e6661278d108db",
                "name": "BTC_USD",
                "bid": 1000,
                "ask": 1000,
                "timestamp": "00:00:00",
                "__v": 0
            }
        ],
        "_id": "5a4f238262e6661278d108d0",
        "name": "test_exchange 2",
        "state": "sell",
        "__v": 2
    },
    {
        "currencies": [
            {
                "recieved": "2018-01-05T06:19:24.358Z",
                "_id": "5a4f23c462e6661278d108d9",
                "name": "BTC_USD",
                "bid": 1000,
                "ask": 1000,
                "timestamp": "00:00:00",
                "__v": 0
            }
        ],
        "_id": "5a4f239662e6661278d108d3",
        "name": "test_exchange 3",
        "state": "sell",
        "__v": 1
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
        "timestamp": "00:00:00",
        "__v": 0
    },
    {
        "recieved": "2018-01-05T06:08:52.982Z",
        "_id": "5a4f173c055bce127832726b",
        "name": "BTC_USD",
        "bid": 1000,
        "ask": 1000,
        "timestamp": "00:00:00",
        "__v": 0
    },
    {
        "recieved": "2018-01-05T06:19:24.358Z",
        "_id": "5a4f23ae62e6661278d108d4",
        "name": "BTC_USD",
        "bid": 1000,
        "ask": 1000,
        "timestamp": "00:00:00",
        "__v": 0
    },
    {
        "recieved": "2018-01-05T06:19:24.358Z",
        "_id": "5a4f23b062e6661278d108d5",
        "name": "BTC_USD",
        "bid": 1000,
        "ask": 1000,
        "timestamp": "00:00:00",
        "__v": 0
    },
    {
        "recieved": "2018-01-05T06:19:24.358Z",
        "_id": "5a4f23b562e6661278d108d6",
        "name": "BTC_USD",
        "bid": 1000,
        "ask": 1000,
        "timestamp": "00:00:00",
        "__v": 0
    },
    {
        "recieved": "2018-01-05T06:19:24.358Z",
        "_id": "5a4f23bc62e6661278d108d7",
        "name": "BTC_USD",
        "bid": 1000,
        "ask": 1000,
        "timestamp": "00:00:00",
        "__v": 0
    },
    {
        "recieved": "2018-01-05T06:19:24.358Z",
        "_id": "5a4f23bd62e6661278d108d8",
        "name": "BTC_USD",
        "bid": 1000,
        "ask": 1000,
        "timestamp": "00:00:00",
        "__v": 0
    },
    {
        "recieved": "2018-01-05T06:19:24.358Z",
        "_id": "5a4f23c462e6661278d108d9",
        "name": "BTC_USD",
        "bid": 1000,
        "ask": 1000,
        "timestamp": "00:00:00",
        "__v": 0
    },
    {
        "recieved": "2018-01-05T06:19:24.358Z",
        "_id": "5a4f23c862e6661278d108da",
        "name": "BTC_USD",
        "bid": 1000,
        "ask": 1000,
        "timestamp": "00:00:00",
        "__v": 0
    },
    {
        "recieved": "2018-01-05T06:19:24.358Z",
        "_id": "5a4f23c962e6661278d108db",
        "name": "BTC_USD",
        "bid": 1000,
        "ask": 1000,
        "timestamp": "00:00:00",
        "__v": 0
    },
    {
        "recieved": "2018-01-05T06:19:24.358Z",
        "_id": "5a4f23cf62e6661278d108dc",
        "name": "BTC_USD",
        "bid": 1000,
        "ask": 1000,
        "timestamp": "00:00:00",
        "__v": 0
    },
    {
        "recieved": "2018-01-05T06:19:24.358Z",
        "_id": "5a4f23d162e6661278d108dd",
        "name": "BTC_USD",
        "bid": 1000,
        "ask": 1000,
        "timestamp": "00:00:00",
        "__v": 0
    },
    {
        "recieved": "2018-01-05T06:19:24.358Z",
        "_id": "5a4f23d762e6661278d108de",
        "name": "BTC_USD",
        "bid": 1000,
        "ask": 1000,
        "timestamp": "00:00:00",
        "__v": 0
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
        "recieved": "2018-01-05T06:14:27.195Z",
        "_id": "5a4f17e4fd589630582bfc38",
        "exchange": "test_exchange",
        "state": "buy",
        "name": "BTC_USD",
        "price": 5000,
        "percentage": 5,
        "__v": 0
    },
    {
        "recieved": "2018-01-05T06:19:24.360Z",
        "_id": "5a4f254562e6661278d108df",
        "exchange": "test_exchange 3",
        "state": "sell",
        "name": "BTC_USD",
        "price": 7000,
        "percentage": 5,
        "__v": 0
    }
]
```
### Get All BUY Arbitrages From The Database
  ```javascript
  axios.get('[Server Address]/show/arbs/buy');

  //returns format:
  ```
  ```javascript
  [
    {
        "recieved": "2018-01-05T06:14:27.195Z",
        "_id": "5a4f17e4fd589630582bfc38",
        "exchange": "test_exchange",
        "state": "buy",
        "name": "BTC_USD",
        "price": 5000,
        "percentage": 5,
        "__v": 0
    }
]
```
### Get All SELL Arbitrages From The Database
  ```javascript
  axios.get('[Server Address]/show/arbs/sell');

  //returns format:
  ```
  ```javascript
  [
    {
        "recieved": "2018-01-05T06:19:24.360Z",
        "_id": "5a4f254562e6661278d108df",
        "exchange": "test_exchange 3",
        "state": "sell",
        "name": "BTC_USD",
        "price": 7000,
        "percentage": 5,
        "__v": 0
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
    "currencies": [
        {
            "recieved": "2018-01-05T06:08:52.982Z",
            "_id": "5a4f173c055bce127832726b",
            "name": "BTC_USD",
            "bid": 1000,
            "ask": 1000,
            "timestamp": "00:00:00",
            "__v": 0
        }
    ],
    "_id": "5a4f170d055bce1278327268",
    "name": "test_exchange",
    "state": "buy",
    "__v": 1
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
    "timestamp": "00:00:00",
    "__v": 0
}
```
### Get Arbitrage By ID
  ```javascript
  axios.get('[Server Address]/show/arb/[id]');

  //returns format:
  ```
  ```javascript
  {
    "recieved": "2018-01-05T06:19:24.360Z",
    "_id": "5a4f254562e6661278d108df",
    "exchange": "test_exchange 3",
    "state": "sell",
    "name": "BTC_USD",
    "percentage": 5,
    "__v": 0
}
  ```
### Remove Exchange By ID
  ```javascript
  axios.delete('[Server Address]/remove/exchange/:id');
  //returns the removed ID
  ```
### Remove Currency By ID
  ```javascript
  axios.delete('[Server Address]/remove/currency/:id');
  //returns the removed ID
  ```
### Remove Arbitrage By ID
  ```javascript
  axios.delete('[Server Address]/remove/arb/:id');
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
