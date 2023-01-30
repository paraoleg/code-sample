// You can remove this file

import { Faker } from '@faker-js/faker';
import { define } from 'typeorm-seeding';
import { ExampleEntity } from '@modules/example/example.entity';

define(ExampleEntity, (faker: Faker) => {
  const example = new ExampleEntity();
  example.name = faker.random.word();
  example.content = faker.lorem.paragraph();
  example.meta_title = faker.random.word();
  example.sort_order = Number(faker.random.numeric(100));
  example.meta_description = faker.lorem.sentence();
  example.slug = faker.random.word();
  return example;
});
