import Row from './Row.js'

function Maze({mazeArray}) {
    return(
        <div className="Maze">
            {
                mazeArray.map((row, index) => {
                    return (
                        <Row
                            key={"row"+index} 
                            rowValue={row}
                            rowIndex={index} 
                        />
                    );
                })
            }
        </div>
    );
}

export default Maze;