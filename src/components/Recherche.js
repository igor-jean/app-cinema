import React, { useState } from 'react';

const Recherche = ({onClearCards, onSearchTerm, onFilter}) => {
    const [searchTerm, setSearchTerm] = useState("")
    const [topClicked, setTopClicked] = useState(false)
    const [flopClicked, setFlopClicked] = useState(false)

    const handleClearCards = () => {
        setFlopClicked(false)
        setTopClicked(false)
        onClearCards()
        onSearchTerm(searchTerm)
        topFlop("")
    }

    const topFlop = (target) => {
        if(target === "top") {
            setTopClicked(true)
            setFlopClicked(false)
            onFilter("top")
        } else if(target === "flop") {
            setTopClicked(false)
            setFlopClicked(true)
            onFilter("flop")
        } else if(target === "") {
            onFilter("")
        }

    }

    return (
        <div>
            <div className='searchbar'>
                <input 
                    type="search" 
                    onChange={(e)=>setSearchTerm(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleClearCards();
                        }
                    }}
                /> 
                <span onClick={handleClearCards}>Rechercher</span>
            </div>
            <div className="top-flop">
                <span onClick={()=> topFlop("top")} className={topClicked ? "clicked" : ""}>Top&emsp; <i className="fa-solid fa-arrow-up"></i></span>
                <span onClick={()=> topFlop("flop")} className={flopClicked ? "clicked" : ""}><i className="fa-solid fa-arrow-down"></i>&emsp; Flop</span>
            </div>
        </div>
    );
};

export default Recherche;