import { idData } from "../modules/data.js";
import { renderPage } from "../modules/function.js";

const init = async () => {
    const urlString = window.location.href
    const url = new URL(urlString);
    const id = url.searchParams.get("id");
    const data = await idData(id);
    renderPage(data)
}

init()