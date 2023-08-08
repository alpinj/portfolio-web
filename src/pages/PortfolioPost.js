import React, { useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import sanityClient from "../client.js";
import imageUrlBuilder from "@sanity/image-url";
import BlockContent from "@sanity/block-content-to-react";

const builder = imageUrlBuilder(sanityClient);

function urlFor(source) {
	return builder.image(source);
}


function PortfolioPost() {
    const [portfolioPost, setPortfolioPost] = useState(null);
    const {slug} = useParams();
    
    useEffect(() => {
        sanityClient
            .fetch(`*[slug.current == "${slug}"]
                {
                    title,
                    _id,
                    slug,
                    mainImage{
                        asset->{
                            _id,
                            url
                        }
                    },
                    role,
                    client,
                    body
                }
            `)
            .then((data) => setPortfolioPost(data[0]))
            .catch(console.error)
    }, [slug]);

    if(!portfolioPost) return <div>Loading...</div>

    return(
        <main className="px-80 pt-4">
            <img
                src={urlFor(portfolioPost.mainImage).url()}
                alt={portfolioPost.mainImage.alt}
                className="w-full rounded-xl"
            />
            <h1 className="font-bold text-2xl pt-2">
                {portfolioPost.title}
            </h1>
            <span className="text-lg">
                {portfolioPost.client} - {portfolioPost.role}
            </span>
            <div className="py-16 prose">
                <BlockContent blocks={portfolioPost.body} projectId="ws4belvh" dataset="production"/>
            </div>

        </main>
    );
}

export default PortfolioPost;
