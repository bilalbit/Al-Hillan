'use client';
import * as React from 'react';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {getCourseWithLabel} from '@/features/courses/server/api';
import {usePathname, useRouter, useSearchParams} from 'next/navigation';

// Define TypeScript interface for course data
interface Course {
  value: string;
  label: string;
}

export const CourseSelect = () => {
  const [courses, setCourses] = React.useState<Course[] | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Utility to create query string
  const createQueryString = React.useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  // Fetch courses on mount
  React.useEffect(() => {
    async function fetchCourses() {
      try {
        setIsLoading(true);
        const fetchedCourses = await getCourseWithLabel();
        setCourses(fetchedCourses);
      } catch (err) {
        setError(`Failed to load courses${err}`);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCourses();
  }, []);

  // Handle course selection
  const handleValueChange = (value: string) => {
   if (value === 'none') {
      router.push(pathname); // Navigate without course param
    } else {
      const selectedCourse = courses?.find((course) => course.value === value);
      if (selectedCourse) {
        router.push(`${pathname}?${createQueryString('course', selectedCourse.label)}`);
      }
    }
  };

  return (
    <Select onValueChange={handleValueChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Filter by Course" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Courses</SelectLabel>
             <SelectItem value="none">None</SelectItem>
          {isLoading ? (
            <SelectItem value="loading" disabled>
              Loading...
            </SelectItem>
          ) : error ? (
            <SelectItem value="error" disabled>
              {error}
            </SelectItem>
          ) : courses && courses.length > 0 ? (
            courses.map((course) => (
              <SelectItem key={course.value} value={course.value}>
                {course.label}
              </SelectItem>
            ))
          ) : (
            <SelectItem value="no-courses" disabled>
              No courses available
            </SelectItem>
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};