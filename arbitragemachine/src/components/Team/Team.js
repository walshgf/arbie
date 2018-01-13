import React, { Component } from 'react';
import Dude from './Dude';

export default class Team extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: 'centerer'
    }
  }
  componentDidMount = () => {
    window.scrollTo(0, 0);
    //Animate entrance to page
    setTimeout(() => {
      this.setState({ classes: 'centerer centerer-show'});
    }, 250);
  }

  //Animate out of page
  componentWillUnmount = () => this.setState({ classes: 'centerer'});

  render = () => {
    return (
      <section className='team'>
        <div className={this.state.classes}>
          <h2>{
            //Split text effect
            'Nice to meet you'.split('').map((letter, i) => {
              if(letter === ' ') {
                return (
                  <div key={i}>&nbsp;</div>
                );
              } else {
                return (
                  //each letter has a slightly larger transition delay
                  <div key={i} style={{
                    transitionDelay: `${i/20}s`
                  }}>{letter}</div>
                );
              }
            })
          }</h2>
          <Dude 
            image="https://media.licdn.com/media/AAIA_wDGAAAAAQAAAAAAAAs2AAAAJGY4MGM5ZmY5LTVjOGMtNDRlYi1hNjdmLTBlNzhmM2IyZjcwNA.jpg"
            name="Troy Bradley"
            bio="Troy hails from Perry, Iowa, where he was worked at a local Wireless Internet Service Provider before finding out about Lambda. He wants to program Smart Contracts once he graduates from Lambda. He's looking forward to the release of Ready Player One later this year." />
          <Dude 
            image="https://media.licdn.com/media/AAMAAQDGAAwAAQAAAAAAAAxaAAAAJDc0YWMyMmI3LWYxZTAtNDVhOC05NGUxLTE0YmFlOGY0MjUxNA.jpg"
            name="Brandon Fizer"
            bio="Brandon lives in Fayetteville, North Carolina. A Professional Tattoo Artist at Sacred Heart Students, Brandon has a keen eye for design. Once he's graduated Lambda School, he intends to work with gaming programs in Unity or Unreal." />
          <Dude 
            image="https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/2/000/0e2/27b/243d08b.jpg"
            name="Lorin Fields"
            bio="Lorin was raised in Portland, Oregon, but now resides in Los Angeles. Prior to joining Lambda School, Lorin operated several online businesses that had interests in Blockchain and Cryptocurrencies. He decided to attend Lambda school in order to pursue a formal Computer Science education. He looks forward to making waves in the Blockchain/Crypto space upon completion" />  
          <Dude 
            image="https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAArjAAAAJDQ3MTAxM2I3LWRmY2EtNGY3YS1hMjAxLWVhZDY5NDI3YzE4MA.jpg"
            name="Abby Tiffany"
            bio="Abby grew up in Fairfax, Virginia and currently lives in Seattle, Washington. Before being accepted to Lambda, Abby worked in banking. She wants to work with Blockchain technology after graduating from the program in May 2018. Abby, who majored in American Sign Language in undergrad, hopes to write kick-ass back-end code for many years." />
          <Dude 
            image="https://files.slack.com/files-tmb/T4JUEB3ME-F8PGQLJ8P-18cc1bbc59/20170820_031447_720.jpg"
            name="Kairat Abylkasymov"
            bio="Originally from Kyrgyzstan, Kairat now lives in New York. Motivated by a desire to become a high-level programmer, Kairat has been teaching himself programming skills before coming to Lambda School, starting with Ruby. He is eager to continue his education while working after graduation." />
          <Dude 
            image="https://files.slack.com/files-tmb/T4JUEB3ME-F8PGQLJ8P-18cc1bbc59/20170820_031447_720.jpg"
            name="Alex Figliolia"
            bio="Alex grew up on Long Island, but spends the majority of the year in West Palm Beach. Alex fell into coding following his undergraduate years. With his newly gained sobriety, he now drops fire in text editors everywhere." />
        </div>
      </section>
    );
  }
}