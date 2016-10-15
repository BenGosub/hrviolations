# -*- coding: utf-8 -*-
import scrapy
from scrapy.linkextractors import LinkExtractor
from scrapy.spiders import CrawlSpider, Rule

from prijavi.items import PrijaviItem


class MainSpider(CrawlSpider):
    name = 'main'
    allowed_domains = ['govornaomraza.mk', 'http://prijavinasilstvo.mk/', 'zlostorstvaodomraza.com']
    start_urls = ['http://govornaomraza.mk/reports/']

    rules = (
        Rule(LinkExtractor(restrict_xpaths='//a[@class="next"]')),
        Rule(LinkExtractor(restrict_xpaths='//a[@class="r_title"]'), callback='parse_item')
    )

    def parse_item(self, response):
        i = PrijaviItem()
        i['title'] = response.xpath('//h1[@class="report-title"]/text()').extract_first()
        i['datetime_published'] = response.xpath('//span[@class="r_date"]/text()').extract_first()
        i['description'] = response.xpath('//div[@class="report-description-text"]/text()')[1].extract()
        i['link'] = response.xpath('//div[@class="credibility"]/a/@href').extract_first()
        i['source'] = response.url
        i['verification'] = response.xpath('//p[contains(@class, "verified")]').extract_first()
        i['categories'] = response.xpath('//a[contains(@href, "?c=")]/@title').extract()

        return i
