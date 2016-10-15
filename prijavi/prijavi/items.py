# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# http://doc.scrapy.org/en/latest/topics/items.html

import scrapy


class PrijaviItem(scrapy.Item):
    # define the fields for your item here like:
    # name = scrapy.Field()
    title = scrapy.Field()
    datetime_published = scrapy.Field()
    description = scrapy.Field()
    link = scrapy.Field()
    source = scrapy.Field()
    verification = scrapy.Field()
    categories = scrapy.Field()
