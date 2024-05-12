import { Link } from 'react-router-dom';

import './Header.css';

const Header = () => {
    return (
        <div className='header' data-testid='header-test-id'>
            <nav className='navbar'>
                <div className='title'>Welcome to your Task Manager!</div>

               
                <div className='links'>
                    <div>
                        <Link to='/' className='link'>
                            List tasks
                        </Link>
                    </div>
                    <div>
                        <Link to='/addTask' className='link'>
                            Add task
                        </Link>
                    </div>
                    <div>
                        <Link to='/chart' className='link'>
                            Chart
                        </Link>
                    </div>

                </div>
            </nav>
        </div>
    );
};

export { Header };
