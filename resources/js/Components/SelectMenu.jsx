import Form from 'react-bootstrap/Form';

function SelectMenu() {
    return (
        <div className="flex justify-center my-2 text-gray-500">
            <Form.Select size="sm" className="mx-3 border selectStyle" aria-label="Currency picker">
                <option value="1">HUF</option>
                <option value="2">EUR</option>
                <option value="3">USD</option>
                <option value="4">GBP</option>
            </Form.Select>
        </div>
    );
}

export default SelectMenu;
