import Image from "next/image";

function Card({ item, handleSelectedCards, toggled, stopflip }) {
    return (
        <div className="item">
            <div className={toggled ? "toggled" : ""}>
                    <Image width={20} height={20} className="face" src={item.img} alt="face" />
                
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