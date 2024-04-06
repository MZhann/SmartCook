import SelectOpponent from "@/components/modal/battle-cards/choose-opponent-cards/SelectOpponentCard";
import "../app/globals.css";

import SelectTitleCard from "@/components/modal/battle-cards/choose-opponent-cards/SelectTitileCard";
import BattleReceiptCard from "@/components/modal/battle-cards/profile-battle-cards/BattleReceiptCard";
import CreatingReceipt from "@/components/modal/CreatingReceipt";
import CreateReceiptCard from "@/components/modal/battle-cards/choose-opponent-cards/CreateReceiptCard";

const Test = () => {
    return (
        <div className="w-full h-[1000px] bg-[#2A293B] p-10">
            {/* <SelectTitleCard /> */}
            {/* <SelectOpponent /> */}
            <CreateReceiptCard />
        </div>
    );
};

export default Test;