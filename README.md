
PH Tube is a web-based video streaming application where users can browse and watch videos sorted by categories such as music, comedy, and tutorials.

REST API

GET: Categories

Endpoint: https://openapi.programming-hero.com/api/phero-tube/categories

GET: Videos

Endpoint: https://openapi.programming-hero.com/api/phero-tube/videos

GET: Video based on Catagory [ params ]

Endpoint : https://openapi.programming-hero.com/api/phero-tube/category/categoryId
Example: https://openapi.programming-hero.com/api/phero-tube/category/1001

GET: Video based on Title [ Query ]

Endpoint : https://openapi.programming-hero.com/api/phero-tube/videos?title=videoTitle
Example: https://openapi.programming-hero.com/api/phero-tube/videos?title=shape

GET: Video Details by video_id [ Query ]

Endpoint : https://openapi.programming-hero.com/api/phero-tube/video/video_id
Example: https://openapi.programming-hero.com/api/phero-tube/video/aaac

Requirements

Create a responsive Navbar which have following elements
Logo of PH-Tube at Left
A Search Box with Search Button at Center
A Sort Button at the Right
(Add a border at bottom of the Navbar)
Create Dynamic Category Section
Load all the Catagory Button From API and Show them in a centered position
on click on a certain button, Load specific Catagory Data
Integrate active button functionality for better UX
Create Dynamic Video Sections
Load all the videos from API
use the Card Layout mentioned in Design part
Show Verified badge (if Verified)
on click Show Video Details with Author info in a modal
Show No Video Icon if specific category have no videos
Additional Features
Search Functionality
Integrate search functionality
on input change de-activate active button on category and show matched videos only