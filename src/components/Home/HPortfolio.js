import React, {useState, useEffect} from "react";
import sanityClient from "../../client.js";
import { Link } from "react-router-dom";
import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(sanityClient);

function urlFor(source) {
	return builder.image(source);
}

function HPortfolio() {

    const [portfolioData, setPortfolio] = useState(null);

    useEffect(() => {
        sanityClient
            .fetch(
                `*[_type == "portfolio"]{
                    title,
                    slug,
                    mainImage{
                        asset->{
                            _id,
                            url
                        }
                    },
                    role,
                    client
                }
                ` 
            )
            .then((data) => setPortfolio(data))
            .catch(console.error)
    }, []);




    return(
        <section className="pt-12 pb-12 px-40">
            <div className="inline-flex justify-between items-center w-full">
                <h2 className="text-xl font-bold">
                    design
                </h2>
                <Link className="text-xl" to="/design/">
                    see all
                </Link>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-6">
                {portfolioData && portfolioData.map((portfolio) => (
                    <Link to={"/portfolio/" + portfolio.slug.current}> 
                        <img
                            src={urlFor(portfolio.mainImage).width(800).url()}
                            alt={portfolio.mainImage.alt}
                            className="w-full rounded-xl grayscale hover:grayscale-0"
                        />
                        <h3 className="pt-4 font-medium text-lg">{portfolio.title}</h3>
                        <p>{portfolio.role} - {portfolio.client}</p>
                    </Link>
                ))}
                
            </div>
        </section>
    );
}

export default HPortfolio;