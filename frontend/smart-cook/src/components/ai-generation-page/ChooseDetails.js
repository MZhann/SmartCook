import React from "react";
import Ingredient from "./Ingredient";
import { useState } from "react";
import Image from "next/image";
import apple from "../../../public/images/apple.png";
import avocado from "../../../public/images/avocado.png";
import banana from "../../../public/images/banana.png";
import bacon from "../../../public/images/bacon.png";
import bread from "../../../public/images/bread.png";
import broccoli from "../../../public/images/broccoli.png";
import butter from "../../../public/images/butter.png";
import carrot from "../../../public/images/carrot.png";
import cheese from "../../../public/images/cheese1.png";
import chicken from "../../../public/images/chicken.png";
import corn from "../../../public/images/corn.png";
import cucumber from "../../../public/images/cucumber.png";
import egg from "../../../public/images/egg.png";
import eggplant from "../../../public/images/eggplant.png";
import fish from "../../../public/images/fish.png";
import garlic from "../../../public/images/garlic.png";
import honey from "../../../public/images/honey.png";
import lemon from "../../../public/images/lemon.png";
import lettuce from "../../../public/images/lettuce.png";
import meat from "../../../public/images/meat.png";
import milk from "../../../public/images/milk.png";
import mushroom from "../../../public/images/mushroom.png";
import olive from "../../../public/images/olive.png";
import onion from "../../../public/images/onion.png";
import orange from "../../../public/images/orange.png";
import peach from "../../../public/images/peach.png";
import peanuts from "../../../public/images/peanuts.png";
import hot from "../../../public/images/hot.png";
import potato from "../../../public/images/potato.png";
import rice from "../../../public/images/rice.png";
import salt from "../../../public/images/salt.png";
import shrimp from "../../../public/images/shrimp.png";
import spaghetti from "../../../public/images/spaghetti.png";
import sugar from "../../../public/images/sugar.png";
import tomato from "../../../public/images/tomato.png";
import water from "../../../public/images/water.png";
import Options from "../ai-generation-page/Options";

const ChooseDetails = () => {
    const [checkboxes, setCheckboxes] = useState(Array(36).fill(false));
    const [ingredients, setIngredients] = useState([]);

    const handleCheckboxChange = (index, name) => {
        console.log("PRESSED");
        const newCheckboxes = [...checkboxes];
        newCheckboxes[index] = !newCheckboxes[index];
        console.log(newCheckboxes[index]);
        setCheckboxes(newCheckboxes);

        if (newCheckboxes[index]) {
            setIngredients((prevIngredients) => [
                ...prevIngredients,
                { name: name },
            ]);
        } else {
            setIngredients((prevIngredients) =>
                prevIngredients.filter((ingredient) => ingredient.name !== name)
            );
        }
    };

    return (
        <div>
            <div className="w-full flex flex-wrap justify-between">
                <Ingredient
                    image={apple}
                    name={"apple"}
                    key={0}
                    id={0}
                    checked={checkboxes[0]}
                    onChange={() => handleCheckboxChange(0, "apple")}
                />
                <Ingredient
                    image={avocado}
                    name={"avocado"}
                    id={1}
                    key={1}
                    checked={checkboxes[1]}
                    onChange={() => handleCheckboxChange(1, "avocado")}
                />
                <Ingredient
                    image={banana}
                    name={"banana"}
                    key={2}
                    id={2}
                    checked={checkboxes[2]}
                    onChange={() => handleCheckboxChange(2, "banana")}
                />
                <Ingredient
                    image={bacon}
                    name={"bacon"}
                    key={3}
                    id={3}
                    checked={checkboxes[3]}
                    onChange={() => handleCheckboxChange(3, "bacon")}
                />
                <Ingredient
                    image={bread}
                    name={"bread"}
                    id={4}
                    key={4}
                    checked={checkboxes[4]}
                    onChange={() => handleCheckboxChange(4, "bread")}
                />
                <Ingredient
                    image={broccoli}
                    name={"broccoli"}
                    id={5}
                    key={5}
                    checked={checkboxes[5]}
                    onChange={() => handleCheckboxChange(5, "broccoli")}
                />
                <Ingredient
                    image={butter}
                    name={"butter"}
                    id={6}
                    key={6}
                    checked={checkboxes[6]}
                    onChange={() => handleCheckboxChange(6, "butter")}
                />
                <Ingredient
                    image={carrot}
                    name={"carrot"}
                    id={7}
                    key={7}
                    checked={checkboxes[7]}
                    onChange={() => handleCheckboxChange(7, "carrot")}
                />
                <Ingredient
                    image={cheese}
                    name={"cheese"}
                    id={8}
                    key={8}
                    checked={checkboxes[8]}
                    onChange={() => handleCheckboxChange(8, "cheese")}
                />
                <Ingredient
                    image={chicken}
                    name={"chicken"}
                    id={9}
                    key={9}
                    checked={checkboxes[9]}
                    onChange={() => handleCheckboxChange(9, "chicken")}
                />
                <Ingredient
                    image={corn}
                    name={"corn"}
                    id={10}
                    key={10}
                    checked={checkboxes[10]}
                    onChange={() => handleCheckboxChange(10, "corn")}
                />
                <Ingredient
                    image={cucumber}
                    name={"cucumber"}
                    id={11}
                    key={11}
                    checked={checkboxes[11]}
                    onChange={() => handleCheckboxChange(11, "cucumber")}
                />
                <Ingredient
                    image={egg}
                    name={"egg"}
                    key={12}
                    id={12}
                    checked={checkboxes[12]}
                    onChange={() => handleCheckboxChange(12, "egg")}
                />
                <Ingredient
                    image={eggplant}
                    name={"eggplant"}
                    key={13}
                    id={13}
                    checked={checkboxes[13]}
                    onChange={() => handleCheckboxChange(13, "eggplant")}
                />
                <Ingredient
                    image={fish}
                    name={"fish"}
                    id={14}
                    key={14}
                    checked={checkboxes[14]}
                    onChange={() => handleCheckboxChange(14, "fish")}
                />
                <Ingredient
                    image={garlic}
                    name={"garlic"}
                    key={15}
                    id={15}
                    checked={checkboxes[15]}
                    onChange={() => handleCheckboxChange(15, "garlic")}
                />
                <Ingredient
                    image={honey}
                    name={"honey"}
                    key={16}
                    id={16}
                    checked={checkboxes[16]}
                    onChange={() => handleCheckboxChange(16, "honey")}
                />
                <Ingredient
                    image={lemon}
                    name={"lemon"}
                    key={17}
                    id={17}
                    checked={checkboxes[17]}
                    onChange={() => handleCheckboxChange(17, "lemon")}
                />
                <Ingredient
                    image={lettuce}
                    name={"lettuce"}
                    key={18}
                    id={18}
                    checked={checkboxes[18]}
                    onChange={() => handleCheckboxChange(18, "lettuce")}
                />
                <Ingredient
                    image={meat}
                    name={"meat"}
                    key={19}
                    id={19}
                    checked={checkboxes[19]}
                    onChange={() => handleCheckboxChange(19, "meat")}
                />
                <Ingredient
                    image={milk}
                    name={"milk"}
                    key={20}
                    id={20}
                    checked={checkboxes[20]}
                    onChange={() => handleCheckboxChange(20, "milk")}
                />
                <Ingredient
                    image={mushroom}
                    name={"mushroom"}
                    key={21}
                    id={21}
                    checked={checkboxes[21]}
                    onChange={() => handleCheckboxChange(21, "mushroom")}
                />
                <Ingredient
                    image={olive}
                    name={"olive"}
                    key={22}
                    id={22}
                    checked={checkboxes[22]}
                    onChange={() => handleCheckboxChange(22, "olive")}
                />
                <Ingredient
                    image={onion}
                    name={"onion"}
                    key={23}
                    id={23}
                    checked={checkboxes[23]}
                    onChange={() => handleCheckboxChange(23, "onion")}
                />
                <Ingredient
                    image={orange}
                    name={"orange"}
                    key={24}
                    id={24}
                    checked={checkboxes[24]}
                    onChange={() => handleCheckboxChange(24, "orange")}
                />
                <Ingredient
                    image={peach}
                    name={"peach"}
                    key={25}
                    id={25}
                    checked={checkboxes[25]}
                    onChange={() => handleCheckboxChange(25, "peach")}
                />
                <Ingredient
                    image={peanuts}
                    name={"peanuts"}
                    key={26}
                    id={26}
                    checked={checkboxes[26]}
                    onChange={() => handleCheckboxChange(26, "peanuts")}
                />
                <Ingredient
                    image={hot}
                    name={"hot"}
                    key={27}
                    id={27}
                    checked={checkboxes[27]}
                    onChange={() => handleCheckboxChange(27, "hot")}
                />
                <Ingredient
                    image={potato}
                    name={"potato"}
                    key={28}
                    id={28}
                    checked={checkboxes[28]}
                    onChange={() => handleCheckboxChange(28, "potato")}
                />
                <Ingredient
                    image={rice}
                    name={"rice"}
                    key={29}
                    id={29}
                    checked={checkboxes[29]}
                    onChange={() => handleCheckboxChange(29, "rice")}
                />
                <Ingredient
                    image={salt}
                    name={"salt"}
                    id={30}
                    key={30}
                    checked={checkboxes[30]}
                    onChange={() => handleCheckboxChange(30, "salt")}
                />
                <Ingredient
                    image={shrimp}
                    name={"shrimp"}
                    id={31}
                    key={31}
                    checked={checkboxes[31]}
                    onChange={() => handleCheckboxChange(31, "shrimp")}
                />
                <Ingredient
                    image={spaghetti}
                    name={"spaghetti"}
                    id={32}
                    key={32}
                    checked={checkboxes[32]}
                    onChange={() => handleCheckboxChange(32, "spaghetti")}
                />
                <Ingredient
                    image={sugar}
                    name={"sugar"}
                    id={33}
                    key={33}
                    checked={checkboxes[33]}
                    onChange={() => handleCheckboxChange(33, "sugar")}
                />
                <Ingredient
                    image={tomato}
                    name={"tomato"}
                    key={34}
                    id={34}
                    checked={checkboxes[34]}
                    onChange={() => handleCheckboxChange(34, "tomato")}
                />
                <Ingredient
                    image={water}
                    name={"water"}
                    id={35}
                    key={35}
                    checked={checkboxes[35]}
                    onChange={() => handleCheckboxChange(35, "water")}
                />
            </div>
            <Options ingredients={ingredients} />
        </div>
    );
};

export default ChooseDetails;
