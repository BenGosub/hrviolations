# -*- coding: utf-8 -*-
import scrapy
from scrapy.http import Request

from prijavi.items import PrijaviItem


class MainSimpleSpider(scrapy.Spider):
    name = "main_simple"
    allowed_domains = ["govornaomraza.mk", "prijavinasilstvo.mk", "zlostorstvaodomraza.com"]
    start_urls = (
        'http://govornaomraza.mk/reports/fetch_reports?c%5B0%5D=8&page=1',
        'http://prijavinasilstvo.mk/reports/fetch_reports?page=1',
        'http://www.zlostorstvaodomraza.com/reports/fetch_reports?c%5B0%5D=11&page=1',
    )


    def parse(self, response):
        last_page = response.xpath('//ul[@class="pager"]/li/span/a/text()')[-1].extract()
        last_page_iter = int(last_page) + 1
        for page_number in range(1, last_page_iter):
            url = response.url[:-1] + str(page_number)
            yield Request(url, callback=self.get_articles)


    def get_articles(self, response):
        titles = response.xpath('//a[@class="r_title"]/@href').extract()
        for title in titles:
            yield Request(title, callback=self.parse_item)



    def parse_item(self, response):
        i = PrijaviItem()
        i['title'] = response.xpath('//h1[@class="report-title"]/text()').extract_first()
        i['datetime_published'] = response.xpath('//span[@class="r_date"]/text()').extract_first()
        description = response.xpath('//div[@class="report-description-text"]/text()')[1].extract()
        try:
            i['description'] = description.strip()
        except IndexError:
            i['description'] = description
        i['link'] = response.xpath('//div[@class="credibility"]/a/@href').extract_first()
        i['source'] = response.url
        i['verification'] = response.xpath('//p[contains(@class, "verified")]/text()').extract_first()
        i['categories'] = response.xpath('//a[contains(@href, "?c=")]/@title').extract()

        return i        
