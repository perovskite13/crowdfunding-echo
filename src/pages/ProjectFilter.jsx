function ProjectFilter() {
    // Variables
    const [projectList, setProjectList] = useState([]);
    const [filter, setFilter] = useState();
    //methods
    useEffect(() => {
      fetch(`${process.env.REACT_APP_API_URL}echo/`)
        .then((results) => {
          return results.json();
        })
        .then((data) => {
          setProjectList(data);
        });
    }, []);
    //templates
    const changeFilter = (event) => {
      if (event.target.name === "All") {
        setFilter();
      } else {
        setFilter(event.target.name);
      }
    };
    return (
      <div>
        <div id="category_buttons">
          <button
            type="button"
            id="Energy/Resources"
            name="Energy/Resources"
            onClick={changeFilter}
          >
            Energy/Resources
          </button>
          <button
            type="button"
            id="Water Quality"
            name="Water Quality"
            onClick={changeFilter}
          >
            Water Quality
          </button>
          <button
            type="button"
            id="Waste/Contamination"
            name="Waste/Contamination"
            onClick={changeFilter}
          >
            Waste/Contamination
          </button>
          <button type="button" 
          id="Community Conservation" 
          name="Community Conservation" 
          onClick={changeFilter}>
            Community Conservation
          </button>
          <button
            type="button"
            id="Social Sustainability"
            name="Social Sustainability"
            onClick={changeFilter}
          >
            Social Sustainability
          </button>
          <button type="button" id="all" name="All" onClick={changeFilter}>
            All
          </button>
        </div>
        <div id="project-list">
          {projectList.reduce((total, projectData, key) => {
            if (filter != null && projectData.category !== filter) return total;
            total.push(<ProjectCard key={key} projectData={projectData} />);
            return total;
          }, [])}
        </div>
      </div>
    );
  }
  export default ProjectFilter;