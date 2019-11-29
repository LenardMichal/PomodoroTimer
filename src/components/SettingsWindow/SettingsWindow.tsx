import React, {useState} from 'react';
import styles from './SettingsWindow.module.scss';
import cogIcon from './cog.svg';

interface SettingsWindowProps {
  setVolume: Function;
}


const SettingsWindow = ({setVolume}: SettingsWindowProps) => {
  
  const [isHidden, setHidden] = useState(true);
  const [current, setCurrent] = useState(() => 0.5);

  // Create prepared volumeButtons
  let volumes : Array<any> = [[0, 'Mute'], [0.1, 'Quiet'], [0.5, 'Medium'], [1, 'Loud']];

  let volumeBtnView = volumes.map(vol => (
    <button
    className={[styles.button, current === vol[0] ? styles.active : null].join(' ')}
    onClick={() => {
      setVolume(vol[0])
      setCurrent(vol[0])
    }}
    key={vol[0]}>
      {vol[1]}
    </button>
  ));

  function toggleHidden() {
    return setHidden(prev => !prev);
  }
  

  return (
  <div className={styles.icon}>
    <img 
      onClick={toggleHidden}
      alt="Clickable Cog Icon"
      src={cogIcon}/>
    {/* Div to hide everything */}
    <div
      className={[styles.dimmer, isHidden ? styles.hidden : null].join(' ')}
      onClick={toggleHidden}
      ></div>
    <div className={[styles.SettingsWindow, isHidden ? styles.hidden : null].join(' ')}>
      <h1>Settings</h1>
      <section className={styles.volumeWrapper}>
        <h2>Volume</h2>
        {volumeBtnView}
      </section>
      <button
        onClick={toggleHidden}
        className={styles.doneButton}>
        Done
      </button>
    </div>
  </div>
  );
};




export default SettingsWindow;