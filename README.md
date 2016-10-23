This is a web tool made for lgbti.mk. It is an aggregator from three web sites for reporting abuse. 

The web sites from which information is aggregated are:
- http://prijavinasilstvo.mk/
- http://www.zlostorstvaodomraza.com/
- http://govornaomraza.mk/

There are two parts of the application, a Python scrapy spider for collecting the data (prijavi) and a web app (wev_table) made with React.js.
The table is made with reactabular.js.org an awesome library for creating tables with React.

Because of limitations on the server of lgbti.mk I wasn't able to build a Python backend. Instead of Python backend the data is uploaded to fieldbook.com which provides an API out of the box that can be opened to GET requests. 