const puppeteer = require('puppeteer');
const fs = require('fs');

const scrap = async(url) => {
      const browser = await puppeteer.launch({headless:false});
      const page = await browser.newPage();
      await page.goto(url);
      await page.setViewport({width:1080,height:1024});
      await page.$eval('[data-title="Characters"]',(el)=> el.click());

      const characterArray = [];
      await repeat(page, characterArray);
        await browser.close();
}

let processed = 0; // Variable para llevar un registro de los elementos procesados

const repeat = async(page, characterArray) => {
    await page.waitForSelector("li.building-block-config.default-content");
    const characters = await page.$$("li.building-block-config.default-content");
    for (let i = processed; i < characters.length; i++) {
        const character = characters[i];
        const img=await character.$eval("img.thumb.reserved-ratio", (el)=> el.src);
        const name=await character.$eval("span.long-title", (el)=> el.textContent.trim());

        const characterData = {
            img,
            name
        };
        characterArray.push(characterData);
        processed++;
    }

    console.log("Llevamos " + processed);
    try {
        const showMore = await page.$("a.show_more.button.large");
        if(showMore){
            await showMore.click();
            await setTimeout(()=> {},500);
            await repeat(page,characterArray);
        }
    } catch (error) {
        await write(characterArray);
      console.log("leido");
   
    }
   
}
const write = (characterArray) => {
    fs.writeFile("characters.json",JSON.stringify(characterArray),() => {
      console.log('done');
    });
  }

  module.exports = {scrap};
