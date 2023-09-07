import Navigation from "./Navigation";

function About() {
    return(
      <div>
        <Navigation />
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100vw',
        }}>
        <div style={{
            marginTop: '50px',
            boxShadow: "rgb(0 0 0 / 16%) 0px 0px 3px 1px",
            paddingTop: '30px',
            paddingBottom: '20px',
            paddingRight: '20px',
            paddingLeft: '20px',
            borderRadius: '8px',
            backgroundColor: 'white',
            width: '50vw',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
        <h1 style={{textAlign: 'center'}}>Movie Recommender</h1>
        <br></br>
        <p>The Movie Reommender takes your preferences and asks ChatGPT for a personalized movie recommendation for you.</p>
        <p>To ensure that you don't get recommended the same movie twice, sign up for an account. Your previous recommendations will be stored to make sure you get a unique recomendation.</p>
        </div>
        </div>
     </div>
     )
};

export default About