export default function Table({ columns, data}) {

    return (
        <table className="table table-bordered">
            <thead>
                <tr>
                    {Object.keys(columns).map(key => 
                        <th scope="col" key={key}>{columns[key]}</th>
                    )}
                </tr>
            </thead>
            <tbody>
                {data.map(item =>
                    <tr key={item.id}>
                        {Object.keys(columns).map((key, index) => 
                            <td key={`${item.id}-${index}`}>{item[key]}</td>
                        )}
                    </tr>
                )}
            </tbody>
        </table>
    )
}