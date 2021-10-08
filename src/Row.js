import Block from './Block.js'

function Row({rowValue, rowIndex}) {
    return (
        <div className="Row">
            {
                rowValue.map((block, index) => {
                    return (
                        <Block
                            key={`block${index} in row${rowIndex}`} 
                            blockValue={block}
                            rowIndex={rowIndex}
                            blockIndex={index}
                        />
                    );
                })
            }
        </div>
    );
}

export default Row;