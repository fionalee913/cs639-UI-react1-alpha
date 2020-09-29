class SearchAndFilter {
  searchAndFilter(courses, search, subject, minimumCredits, maximumCredits) {
    // check min and max credits
    if (minimumCredits != null && minimumCredits !== "") {
      courses = courses.filter(course => 
        course.credits >= minimumCredits
      );
    }
    
    if (maximumCredits != null && maximumCredits !== "") {
      courses = courses.filter(course => 
        course.credits <= maximumCredits
      );
    }
    // check subject
    if (subject !== "All") {
      courses = courses.filter(course => 
        course.subject === subject
      );
    }
    // check search
    if (search != null && search !== "") {
      courses = courses.filter(course => 
        course.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    return courses;
  }

}

export default SearchAndFilter;
