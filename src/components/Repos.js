import React from 'react';
import styled from 'styled-components';
import { GithubContext } from '../context/context';
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from './Charts';
const Repos = () => {
  const { repos } = React.useContext(GithubContext);
  const languages = repos.reduce((total, item) => {
    const { language, stargazers_count } = item;
    //if current item doesn't have language property,return
    if (!language) return total;

    //if total doesn't have language in current item,
    //initialize it
    if (!total[language]) {
      total[language] = { label: language, value: 1, stars: stargazers_count };
    } else {
      total[language] = {
        ...total[language],
        value: total[language].value + 1,
        stars: total[language].stars + stargazers_count,
      };
    }
    return total;
  }, {});

  //turn object to array,sort and slice to only top 5 languages
  const mostUsed = Object.values(languages)
    .sort((a, b) => {
      return b.value - a.value;
    })
    .slice(0, 5);

  //most start per language
  const mostPopular = Object.values(languages)
    .sort((a, b) => {
      return b.stars - a.stars;
    })
    .map((item) => {
      return { ...item, value: item.stars }; //assigning value of stars to 'value' var since chart api expects that
    })
    .slice(0, 5);

  //Stars , forks
  let { stars, forks } = repos.reduce(
    (total, item) => {
      const { stargazers_count, name, forks } = item;
      total.stars[stargazers_count] = { label: name, value: stargazers_count };
      total.forks[forks] = { label: name, value: forks };
      return total;
    },
    { stars: {}, forks: {} }
  );

  //object.values(stars) converts stars to an array
  stars = Object.values(stars).slice(-5).reverse();

  forks = Object.values(forks).slice(-5).reverse();

  const chartData = [
    {
      label: 'HTML',
      value: '16',
    },
    {
      label: 'CSS',
      value: '26',
    },
    {
      label: 'Javascript',
      value: '80',
    },
  ];
  return (
    <section className="section">
      <Wrapper className="section-center">
        {/* <ExampleChart data={chartData} />; */}
        <Pie3D data={mostUsed}></Pie3D>
        <Column3D data={stars}></Column3D>
        <Doughnut2D data={mostPopular}></Doughnut2D>
        <Bar3D data={forks}></Bar3D>
      </Wrapper>
    </section>
  );
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;
