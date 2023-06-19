import '../styles/SearchBar.css';
import { setLoading, setFirstTime, setHandle } from '../reducers/appStateSlice';
import { useDispatch, useSelector } from 'react-redux';

export const SearchBar = () => {
    const handle = useSelector(state => state.appState.handle);
    const dispatch = useDispatch();

    const onInputChange = (e) => {
        dispatch(setHandle(e.target.value));
    };

    return (
        <div className="search-bar">
            <div className='input-container'>
                <label htmlFor='cf-handle'>
                    CF HANDLE
                </label>
                <div className="input-bar-container">
                    <input id='cf-handle' type="text" onChange={onInputChange} value={handle}/>
                    <button className='search-btn' 
                        onClick={() => {
                            dispatch(setLoading(true));
                            dispatch(setFirstTime(false));
                        }}
                    >
                        GO
                    </button>
                </div>
            </div>
        </div>
    )

};