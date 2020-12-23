import React from 'react'

interface Props {
    title: string
}

const Title: React.FC<Props> = ({title}) => {
        return (
            <div style={{padding: '15px 0px 50px 0px', color: '#0E0E2E'}}>
                <h1>{title}</h1>
            </div>
        );
}
export default Title;