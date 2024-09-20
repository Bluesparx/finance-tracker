import React from "react";

const CardBox = (props) => {
  const cards = [
    { title: "Card 1", content: "This is card 1 content" },
    { title: "Card 2", content: "This is card 2 content" },
    { title: "Card 3", content: "This is card 3 content" },
    { title: "Card 4", content: "This is card 4 content" },
  ];

  return (
    <>
      {cards.map((card, index) => (
        <div key={index} className="col-lg-3 col-md-6 mb-4">
          <div className="card h-100">
            <div class="card-header bg-transparent border-success">Header</div>
            <div className="card-body">
              <h5 className="card-title">{card.title}</h5>
              <p className="card-text">{card.content}</p>
            </div>
            <div className="d-flex justify-content-center">
                <CircularProgressBar percentage={75} color="#FF6347"/>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default CardBox;
