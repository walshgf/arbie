import React from 'react';
import "./Team.css";

export default function Team() {
    return (
        <div>
            <h2>The Team</h2>
            <img className="author" src="https://files.slack.com/files-tmb/T4JUEB3ME-F8PGQLJ8P-18cc1bbc59/20170820_031447_720.jpg" alt="Kairat Abylkasymov" />
            <div><b>Kairat Abylkasymov</b></div>
            <div className="bio">Originally from Kyrgyzstan, Kairat now lives in New York. Motivated by a desire to become a high-level programmer, Kairat has been teaching himself programming skills before coming to Lambda School, starting with Ruby. He is eager to continue his education while working after graduation.</div> 

            <img className="author" src="https://media.licdn.com/media/AAIA_wDGAAAAAQAAAAAAAAs2AAAAJGY4MGM5ZmY5LTVjOGMtNDRlYi1hNjdmLTBlNzhmM2IyZjcwNA.jpg" alt="Troy Bradley" />
            <div><b>Troy Bradley</b></div>
            <div className="bio">Troy hails from Perry, Iowa, where he was worked at a local Wireless Internet Service Provider before finding out about Lambda. He wants to program Smart Contracts once he graduates from Lambda. He's looking forward to the release of Ready Player One later this year.</div>

            <img className="author" src="https://media.licdn.com/media/AAMAAQDGAAwAAQAAAAAAAAxaAAAAJDc0YWMyMmI3LWYxZTAtNDVhOC05NGUxLTE0YmFlOGY0MjUxNA.jpg" alt="Brandon Fizer" />
            <div><b>Brandon Fizer</b></div>
            <div className="bio">Brandon lives in Fayetteville, North Carolina. A Professional Tattoo Artist at Sacred Heart Students, Brandon has a keen eye for design. Once he's graduated Lambda School, he intends to work with gaming programs in Unity or Unreal.</div>

            <img className="author" src="https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/2/000/0e2/27b/243d08b.jpg" alt="Lorin Fields" />
            <div><b>Lorin Fields</b></div>
            <div className="bio">Lorin was raised in Portland, Oregon, but now resides in Los Angeles. Prior to joining Lambda School, Lorin operated several online businesses that had interests in Blockchain and Cryptocurrencies. He decided to attend Lambda school in order to pursue a formal Computer Science education. He looks forward to making waves in the Blockchain/Crypto space when he completes the Lambda course.</div>

            <img className="author" src="https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAArjAAAAJDQ3MTAxM2I3LWRmY2EtNGY3YS1hMjAxLWVhZDY5NDI3YzE4MA.jpg" alt="Abby Tiffany"/>
            <div><b>Abby Tiffany</b></div>
            <div className="bio">Abby grew up in Virginia and currently lives in Seattle, Washington. Before being accepted to Lambda, Abby worked in banking. She wants to work with Blockchain technology after graduating from the program in May 2018. Abby, who majored in American Sign Language in undergrad, hopes to write kick-ass back-end code for many years.</div>

        </div>
    );
}