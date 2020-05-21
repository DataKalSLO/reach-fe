import { areValidMetaFields } from '../StoryEditor';

describe('Meta fields validation', () => {
  const goodMetas = [
    {
      title: 'Graduation Rates on the Central Coast',
      description:
        'Over the last 100 years, graduation rates from elementary, middle, and high schools alike have all soared.'
    }
  ];

  const badMetas = [
    { title: '', description: '' },
    { title: ' ', description: ' ' },
    {
      title:
        'Coloring book lo-fi la croix health goth, 90s taiyaki quinoa XOXO chia cornhole helvetica vegan. Flannel unicorn before they sold out man bun.',
      description:
        'Coloring book lo-fi la croix health goth, 90s taiyaki quinoa XOXO chia cornhole helvetica vegan. Flannel unicorn before they sold out man bun. Hell of semiotics truffaut occupy succulents palo santo fam farm-to-table synth four loko biodiesel copper mug.'
    }
  ];

  it.each(goodMetas)('Accepts %s as valid meta fields', meta => {
    expect(areValidMetaFields(meta.title, meta.description)).toBeTruthy();
  });

  it.each(badMetas)('Rejects %s as invalid meta fields', meta => {
    expect(areValidMetaFields(meta.title, meta.description)).toBeFalsy();
  });
});
