export interface AccordionStyles {
  header: HeaderStyle;
  body: BodyStyle;
}

interface HeaderStyle {
  backgroundColor: string;
  hoverBackgroundColor: string;
  textColor: string;
  iconColor: string;
}

interface BodyStyle {
  backgroundColor: string;
}

export const defaultStyle: AccordionStyles = {
  header: {
    backgroundColor: 'var(--juquinha-accordion-header-background)',
    hoverBackgroundColor: 'var(--juquinha-accordion-header-background-hover)',
    textColor: 'var(--juquinha-accordion-header-text-color)',
    iconColor: 'var(--juquinha-accordion-header-icon-color)',
  },
  body: {
    backgroundColor: 'var(--juquinha-accordion-body-background)',
  },
};
