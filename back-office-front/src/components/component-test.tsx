interface Props {
    name: string;
    age?: number;
}

const componentTest = ({name, age}:Props) => {

    return (
        <div>
            <h2>Component test</h2>
            <h2>Bonjour { name }, { age } ans</h2>
        </div>
    );
}

export default componentTest;