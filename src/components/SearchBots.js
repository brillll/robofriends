import React from 'react';

const SearchBots = ({searchfield, searchChange}) => {
    return (
        <div className='pa2'>
            <input 
                className='pa3 b--green bg-lightest-blue'
                type='search' 
                placeholder='Search Bots'
                onChange={searchChange}
            />
        </div>
    )
}

export default SearchBots;