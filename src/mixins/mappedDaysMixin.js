// used for mapping days to values in Calendar and CourseTable components
export const mappedDaysMixin = {
  data() {
    return {
      mappedDays: {
        sunday: 1,
        monday: 2,
        tuesday: 3,
        wednesday: 4,
        thursday: 5,
        friday: 6,
        saturday: 7,
      },
    };
  },
};
