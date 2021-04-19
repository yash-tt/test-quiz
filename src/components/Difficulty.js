import React from "react";
import { StarOutlined, StarFilled } from '@ant-design/icons';

const DIFFICULTY = {
    EASY: 'easy',
    MEDIUM: 'medium',
    HARD: 'hard'
}

const STARS = ({ difficulty }) => {

    const starFilled = ((Object.values(DIFFICULTY).findIndex(res => res === difficulty)) + 1);
    const starOutlined = ((Object.values(DIFFICULTY).length) - starFilled);
    var result = [
        ...Array(starFilled).fill(<StarFilled />),
        ...Array(starOutlined).fill(<StarOutlined />)
    ];

    return (
        <>
            {result.map(showDifficultyLevel => showDifficultyLevel)}
        </>
    )
}

export default STARS;