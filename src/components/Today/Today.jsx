import { useState, useEffect } from "react";

export const TodayProvider: React.FunctionComponent<{}> = ({ children }) => {
  // Allocate a state to keep the current date in
  const [currentDate, setDate] = useState(CalendarDate.today());

  // This function will be called every minute to check for changes
  function updateDateIfChanged() {
    const newDate = CalendarDate.today();
    // setDate would always trigger a render in our case: dates are objects,
    // and newDate will never be equal to currentDate if they are not the
    // same instance.
    // So, only setDate when we know that the date has changed meaningfully.
    if (!newDate.equal(currentDate)) {
      setDate(newDate);
    }
  }

  useEffect(() => {
    // Set up polling for date changes every minute
    // (A sidenote about JS timers - they run on CPU time, not calendar time. This means that
    // while the computer is in sleep mode, the timer is not ticking. That's why we need to
    // check once a minute instead of calculating time to midnight and setting a precise alarm.)
    const intervalID = setInterval(updateDateIfChanged, 60000);
    // setInterval provides us with a cleanup function, pass that on
    return () => clearInterval(intervalID);
    // the effect is good as long as the component lives, no need to ever run it twice
  }, []);

  // Render the React context provider
  return <Today.Provider value={currentDate}>{children}</Today.Provider>;
};