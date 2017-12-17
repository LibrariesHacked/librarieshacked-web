Libraries Hacked website
=============================

The main public website for Libraries Hacked, built using Pico CMS.

What it is
-----------

Libraries hacked is aimed at promoting open data and technology hacks in libraries. It is currently deployed to [https://www.librarieshacked.org](https://www.librarieshacked.org). The website is built using [Pico CMS](http://picocms.org), an easy to use flat file content management system.

This repository contains all the custom configuration and code required to set up the website - additional Pico code is required to run the website. This is decribed in the directory structure.

Supporting technology
---------------------

| Technology | Description |
| ---------- | ----------- |
| HTML/JavaScript/CSS | The these for the site is custom designed using HTML5, JavaScript, and CSS |
| PHP | Pico CMS uses PHP for server side processing |
| Markdown | Content is written in markdown format, which is processed on the server |
| IIS/Apache | The site can be hosted on a number of different web server platforms including these two |

Directory and files structure
-----------------------------

| Directory/File | Description |
| -------------- | ----------- |
| /bin | Populated with the bin directory from Pico build |
| /config | Contains custom config file for site |
| /data | Contains data files used in the examples and tutorials |
| /icons | Icons used in semantic HTML for the site |
| /images | Any images display on the site. Images must be freely licensed |
| /plugins | Plugins for the site to deliver specific functionality |
| /themes | Site themes. Includes single bootstrap directory which is the custom site theme |
| /vendor | Populated with vendor directory from Pico build |
| robots.txt | file to ward off or instruct robots |
| browserconfig.xml |  |
| manifest.json |  |
| favicon.ico | the favicon file for the site to be displayed in browsers |
| web.config | For IIS hosting, provides various redirect rules |

Build instructions
------------------

1. Download the latest Pico release. Copy the content of the **lib** and **vendor** directory into the corresponding directories in this repository
2. Copy the complete content of [librarieshacked-web-content](https://github.com/LibrariesHacked/librarieshacked-web-content) into the **content** directory.
3. Run bower to download the themes library dependencies. 'bower install'
4. Run gulp to move the required files into the theme directory. 'gulp'

Deploy
------

The built website is designed to deploy easily onto a webserver. Copy the entire site and deploy to your web host.

Third-party licences
--------------------

| Project | Description | Licence |
| ------- | ----------- | ------- |
| Pico | The underlying content management system powering the site | [MIT](https://github.com/picocms/Pico/blob/master/LICENSE.md) |

Licence
-------

Original code available under [MIT Licence](/LICENCE.md).
