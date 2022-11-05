import { Controller, Get, Query } from '@nestjs/common';
import { PageService } from 'src/page/services/page/page.service';
import { mockAboutUs } from 'src/mocks/about-us';
import { mockPrivacyPolicy } from 'src/mocks/privacy-policy';
import { mockTermsConditions } from 'src/mocks/terms-conditions';

@Controller('page')
export class PageController {
  constructor(private pageService: PageService){

  }
  @Get('landing')
  async getLandingPage(){
    let pageProps = await this.pageService.getPageByPath("/page/landing")
    
    return {pageProps} 
  }

  @Get('about-us')
  async getAboutUsPage(){
    let pageProps = await this.pageService.getPageByPath("/page/about-us")
    let content = {...mockAboutUs}
    return {...pageProps, ...content} 
  }

  @Get('contact-us')
  async getContactUsPage(){
    return await this.pageService.getPageByPath("/page/contact-us")
  }

  @Get('privacy-policy')
  async getPrivacyPolicyPage(){
    let pageProps = await this.pageService.getPageByPath("/page/privacy-policy")
    let content = mockPrivacyPolicy
    return {...pageProps, ...content}
  }

  @Get('terms-conditions')
  async getTermsConditionsPage(){
    let pageProps = await this.pageService.getPageByPath("/page/terms-conditions")
    let content = mockTermsConditions
    return {...pageProps, ...content}
  }
  
  @Get('search-products')
  async getSearchProduct(@Query('keyword') keyword: string){
    return await this.pageService.getSearchedProducts(keyword)
  }
}
