# Bumbee Labs Code Challenge

Challenge to develop a REST API and processing of visitors data from tracking positions. The data was to be displayed on a map interface on the front-end.

### Information
The project has been developed using [NodeJS](https://nodejs.org/en/) and [ExpressJS](http://expressjs.com/) for implementing a RESTful API for the back-end. On the front-end the chosen javascript mapping library was [LeafletJS](http://leafletjs.com/) to instantiate a slippy map and project instances of the visits geographically.

### Installation Instructions
To download and install this project on your local machine follow CLI instructions below:
```
# clone the repository
git clone <url>
cd <this-repo>

# install node dependencies
npm install
```

### Description
This project focused heavily on working on the back-end environment which is relatively new to me. My preference is working on the front-end and developing user-interfaces and focusing on style, performance and design. Therefore, as a result, I found the test very challenging and implementing all of the requirements of the brief was tough within the time allotted. I was unable to spend time on developing a unique interface to the final product as most of my team was spent architecting the back-end and trying to follow the flow of data.

Currently the project is working and providing visits to the front-end at the /viewer endpoint. However, some features I have been unable to implement in the time. These are:

1. Only sending the node with the strongest RSSI if duplicate exists.
2. In the mock dummy JSON data I was unable to solve a problem with custom generation of device hash. Basically currently each visit object within a single array has a unique device hash based on the helper function written.

In addition, the project brief required a Google Maps front-end, however, I'm not a big fan of that particular mapping library and preferred to utilise the LeafletJS mapping library. This particular library I have used on many projects in the past for creating custom mapping interfaces and dashboards and enjoy that it's open source with a strong developer community behind it.


### Further Notes
Some particular things I would like to improve upon as the project currently stands:

* Create a better designed map on the front-end with scaled markers based upon zoom level along with marker clustering
* Write some unit tests for much of the back-end code perhaps using [MochaJS](https://mochajs.org/)
* Implement a database for archive storage, such as MongoDB or Postgres

I used [GulpJS](http://gulpjs.com/) as a task runner for watching file changes and bundling dependencies for use in the browser. For the project dependencies and development dependencies have a look at the package.json file.
