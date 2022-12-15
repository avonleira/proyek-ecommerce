import { Controller, Get, Param, ParseIntPipe, Query, Request } from '@nestjs/common';
import { PageService } from 'src/page/services/page/page.service';
import { mockAboutUs } from 'src/mocks/about-us';
import { mockTermsConditions } from 'src/mocks/terms-conditions';
import { mockPrivacyPolicy } from 'src/mocks/privacy-policy';

@Controller('page')
export class PageController {
  constructor(private pageService: PageService){

  }
  @Get('landing')
  async getLandingPage(){
    let pageProps = await this.pageService.getPageByPath("/page/landing")
    let categories = await this.pageService.getCategories()
    let showcase = await this.pageService.getShowcase()
    return {pageProps, categories, showcase}
  }

  @Get('landing2')
  async getLoggedLandingPage(){
    let pageProps = await this.pageService.getPageByPath("/page/landing2")
    return {pageProps}
  }

  @Get('about-us')
  async getAboutUsPage(){
    let pageProps = await this.pageService.getPageByPath("/page/about-us")
    let content = {...mockAboutUs}
    return {pageProps, content} 
  }

  @Get('contact-us')
  async getContactUsPage(){
    return await this.pageService.getPageByPath("/page/contact-us")
  }

  @Get('privacy-policy')
  async getPrivacyPolicyPage(){
    let pageProps = await this.pageService.getPageByPath("/page/privacy-policy")
    let content = {...mockPrivacyPolicy}
    return {pageProps, content}
  }

  @Get('terms-conditions')
  async getTermsConditionsPage(){
    let pageProps = await this.pageService.getPageByPath("/page/terms-conditions")
    let content = mockTermsConditions
    return {pageProps, content}
  }
  
  @Get('search-product')
  async getSearchProductPage(@Request() req){
    let pageProps = await this.pageService.getPageByPath("/page/search-products")
    let content = await this.pageService.getSearchedProducts(req.query.q, req.query.tsr, req.query.pmin, req.query.pmax, req.query.sort)
    return {pageProps, content}
  }

  @Get('product/:id_product')
  async getDetailProductPage(@Request() req,@Param('id_product', ParseIntPipe) id_product: number){
    let pageProps = await this.pageService.getPageByPath("/page/product")
    let content = await this.pageService.getDetailProduct(id_product, req.user)
    return {pageProps, content}
  }

  @Get('discovery/:id_discovery')
  async getDiscoveryPage(@Param('id_discovery', ParseIntPipe) id_discovery: number){
    let pageProps = await this.pageService.getPageByPath("/page/discovery")
    let discovery = await this.pageService.getEtalase(id_discovery)
    let tags = await this.pageService.getTagged(id_discovery)
    let products = await this.pageService.getTaggedProducts(tags)
    return {pageProps, ...discovery, items: products}
  }
}
