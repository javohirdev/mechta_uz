import skavarodka2 from "./images/items/img2.jpg"
import axios from "axios";
import {colors, server} from "./server_online";

export const storeProducts = async () => {
    const response = await axios.get("http://server.mechta-posuda.uz:3000/api/product");
    const data = await response.data;


    const items = await [...data].map((item, index) => {
        const {images} = item;
        let _images = [];
        let colors = [];

        for (let i = 0; i < images.length; i++) {
            const {_id, colorId} = images[i];
            let tempImg = {
                id: _id,
                img: `http://server.mechta-posuda.uz:3000/${images[i].url}`,
            };
            _images = [..._images, tempImg];

            if (colorId === undefined)
                continue;

            let colorTemp = {
                img: `http://server.mechta-posuda.uz:3000/${colorId.url}`,
                img_id: _id,
                colorId: colorId._id
            };
            colors = [...colors, colorTemp]
        }
            let current_img = _images[1].img;

        return {
            id: item._id,
            title: item.nameRu,
            img: [..._images],
            price: item.price,
            model: "Mechta",
            description: item.descriptionRu,
            inCart: false,
            count: 0,
            total: 0,
            weight: item.netto,
            instruction: item.instruksiyaRu,
            characteristic: item.xarakterRu,
            categoryId: item.category,
            slug: item.slug,
            current_img,
            diametr: item.diametr,
            colors,
            size: item.size.replace(/,/g," * "),
            diz: item.diz,
            video: item.video
        }
    });
    return items;
};
export const category = async () => {
    const response = await axios.get("http://server.mechta-posuda.uz:3000/api/category");
    const data = await response.data;
    const category = [...data];
    return category;
};

export const detailProduct = {
    id: 2,
    title: "Котел походный с крышкой 8л",
    img: skavarodka2,
    price: 1000000,
    model: "Mechta",
    info: "Lorem ipsum dolor amet offal butcher quinoa sustainable gastropub, echo park actually green juice sriracha paleo. Brooklyn sriracha semiotics, DIY coloring book mixtape craft beer sartorial hella blue bottle. Tote bag wolf authentic try-hard put a bird on it mumblecore. Unicorn lumbersexual master cleanse blog hella VHS, vaporware sartorial church-key cardigan single-origin coffee lo-fi organic asymmetrical. Taxidermy semiotics celiac stumptown scenester normcore, ethical helvetica photo booth gentrify.",
    inCart: true,
    count: 1,
    total: 1000000
};