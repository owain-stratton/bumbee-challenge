
Simple tracking server
======================

Develop a REST API server for gathering and processing of visitors data.
Provide with a GoogleMaps viewer frontend for previewing last 100 unique visits.


Description
-----------

Server takes an input data [1] from remote tracking nodes, processes and sends
it to the archive server [2].

Tracking nodes periodically send a list of visits of currently seen devices with
hashed IDs. The nodes sometimes send duplicate visits (same device, position and time),
out of which only with the strongest signal (rssi) should be used.

The node provides an information of its type (node_type) and only data from
"tracker" nodes (node_type==1) and "internet_provider" nodes (node_type==2)
should be used for archive. "mobile_station" node (node_type==3) and "drone"
(node_type==4) data only gets to be locally stored for map presentation.

The server should only accept POST requests at the "/api/track" endpoint with
mandatory "X-Auth-Token: Tracker1234" header.
It should respond with '{"status": "ok"}' JSON data and 200 status code
on successful response, '{"status": "forbidden"}' and 403 code on invalid token
and '{"status": "validation_error"}' and 400 codein case of malformed input data
(all fields are required).

The frontend viewer available at "/viewer" endpoint should serve a GoogleMaps
map showing last 100 visits from all nodes. Visits should be grouped on markers
with positions truncated to 4 decimal places (eg. 50.0622) without rounding.

Server comes with an `algolib.py` module which should be updated with required
functions.

Data formats
------------

[1] Input format of the incoming JSON data:

    [
        "node_type": 0,
        "visits": [
            {"lat": 51.23, "long": 25.543, "time": 1458572383, "device": "727d2a99b62d5759", "rssi": -60},
            {"lat": 51.231, "long": 25.5, "time": 1458572381, "device": "727d2a99b62d5759", "rssi": -60},
            {"lat": 51.23, "long": 25.54, "time": 1458572383, "device": "727d2a99b62d5759", "rssi": -80},
        ]
    ]

[2] Archive server accepts requests at "http://localhost:9090/api/archive"
with data in the following JSON format:

    {
        "node_type": "tracker",         // what node reported it
        "device": "727d2a99b62d5759",   // hash of the device
        "time_start": <int>,            // time of first bisit
        "time_end": <int>,              // time of last visit
        "rssi_min": <int>,              // lowest signal strength
        "rssi_max": <int>,              // highest signal strength
        "samples_count": 2,             // number of visits

        "average_position": {           // average position from the visits
            "latitude": <float>,
            "longitude": <float>,
        }
    }


Requirements
------------
* The application works as described in this document.
* The application should be able to run in different environments
  (development, production) with configurable archive server address
  and authentication token.
* Provide a short description of the project, chosen design and tools -
  its features and limitations. Describe what do you think and what have you
  found during the design/implementation.
* Provide an installation and usage description.
* Use version control to track changes in the code.
