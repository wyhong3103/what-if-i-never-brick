import '../styles/SearchBar.css';
import { setLoading, setFirstTime, setHandle, setMode } from '../reducers/appStateSlice';
import { useDispatch, useSelector } from 'react-redux';

export const SearchBar = () => {
    const handle = useSelector(state => state.appState.handle);
    const loading = useSelector(state => state.appState.loading);
    const mode = useSelector(state => state.appState.mode);
    const dispatch = useDispatch();

    const onInputChange = (e) => {
        dispatch(setHandle(e.target.value));
    };

    const onGo = () => {
        dispatch(setLoading(true));
        dispatch(setFirstTime(false));
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            if (!loading) onGo();
        }
      };


    return (
        <div className="search-bar">
            <div className='input-container'>
                <label htmlFor='cf-handle'>
                    CF HANDLE
                </label>
                <div className="input-bar-container">
                    <input id='cf-handle' type="text" onChange={onInputChange} value={handle} onKeyDown={handleKeyDown}/>
                    <button className='search-btn' 
                        onClick={onGo}
                        disabled={loading}
                    >
                        GO
                    </button>
                </div>
            </div>
            <div className='acc-toggle-container'>
                <p>
                    CURRENT : {mode === 0 ? "SLOW (MORE ACCURATE)" : "FAST (LESS ACCURATE)"}
                </p>
                <button 
                    className='acc-toggle-btn' 
                    onClick={() => {dispatch(setMode(1-mode))}} 
                    disabled={loading}
                >
                    {mode === 1 ? "SLOW (MORE ACCURATE)" : "FAST (LESS ACCURATE)"}
                </button>
            </div>
        </div>
    )

};