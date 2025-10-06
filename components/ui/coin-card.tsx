import React from "react";

const CoinCard = ({
  name,
  price,
  symbol,
}: {
  name: string;
  price: string;
  symbol: string;
}) => {
  return (
    <div
      className="grow h-64 rounded-2xl cursor-pointer
      bg-gradient-to-br from-card-foreground/5 via-card-foreground/10 to-card-foreground/5
      shadow-lg hover:shadow-2xl transition-shadow duration-300
      border border-transparent backdrop-blur-md"
    >
      <div className="p-4">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-sm text-muted-foreground">{symbol}</p>
        <p className="text-xl font-bold">
          {price ? `$${price}` : "Loading..."}
        </p>
      </div>
    </div>
  );
};

export default CoinCard;
