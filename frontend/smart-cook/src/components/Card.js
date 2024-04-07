import Image from "next/image";

function Card({ item, handleSelectedCards, toggled, stopflip }) {
    return (
        <div className="item">
            <div className={toggled ? "toggled" : ""}>
                <Image width={40} height={40} className="face" src={item.img} alt="face" />
                <div
                    className="back"
                    onClick={() => !stopflip && handleSelectedCards(item)}
                >
                    {" "}
                </div>
            </div>
        </div>
    );
}

export default Card;