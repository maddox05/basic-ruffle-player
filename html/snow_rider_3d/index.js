import { chromium } from "playwright";
import { sanitizeFilename, writeFileWithDirectories } from "./fileFunctions.js";
import { normalizeUrl, findActualBaseUrl } from "./functions.js";
/**
 *
 * @param {import("playwright").Response} response
 * @param {string} baseUrl
 */
async function onNetworkResponse(response, baseUrl) {
  const recievedUrl = response.url();
  if (!recievedUrl.includes(baseUrl)) {
    console.log("skipping item not in url we want");
    return;
  }
  try {
    let buffer;

    let res;
    try {
      res = await fetch(recievedUrl);
      const resArrBuffer = await res.arrayBuffer();
      buffer = Buffer.from(resArrBuffer);
      console.log(buffer);
      if (!buffer) {
        console.log(`failed to get anything from ${recievedUrl}, skipping`);
        return;
      }
    } catch (error) {
      console.error(`axios failed with status code ${res?.status}`);
      return;
    }
    const normalizedUrl = normalizeUrl(baseUrl, recievedUrl);
    console.log(
      `file: ${normalizedUrl.padEnd(60)} --- buffer len: ${buffer.length}`
    );
    await writeFileWithDirectories(
      `./output/${sanitizeFilename(normalizedUrl)}`,
      buffer
    );
  } catch (error) {
    console.error(`error getting page (${recievedUrl}) response`);
    throw error;
  }
}

export async function downloadSite(url) {
  try {
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();
    page.on("response", async (response) => {
      await onNetworkResponse(response, findActualBaseUrl(url));
    });
    await page.goto(url, { waitUntil: "networkidle" });
    const content = await page.content();

    await browser.close();
    return "Success";
  } catch (error) {
    // console.error(error);
    return "Error";
  }
}

downloadSite("https://pizzaedition.win/assets/allgames/Snow-Rider3D-main/");

// todo retro bowl gets data while playing game issue https://pizzaedition.win/assets/allgames/retrobowlcollege/new.html
// todo fix spaces issue https://narrow-one.github.io/n88/angry-birds/
