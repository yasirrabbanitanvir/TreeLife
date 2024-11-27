import PlantList from '../components/PlantList';
import { FaLeaf } from 'react-icons/fa';


const Home = () => {
    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold text-center mb-6 mix-blend-color-burn">Welcome to Your Plant Monitoring System</h1>
            <PlantList />
        </div>
    );
};

export default Home;
