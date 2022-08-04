import React from "react";
import styled from "styled-components";
import { Project } from "../../model/project";
import useAuth from "../../hooks/useAuth";
import useToggle from "../../hooks/useToogle";
import { themes } from "../../styles/ColorStyles";
import {
  H3,
  DescriptionCard,
  SmallText,
  SmallText2,
} from "../../styles/TextStyles";
import codeIcon from "./code.svg";

// TODO: 2) Add new propws, one for the closeButton and other for the updateButton
// TODO: 2) HINT: for the first argument, pass element: React.MouseEvent<HTMLElement> to then call element.preventDefault(); and element.stopPropagation();
interface ProjectCardProps {
  project: Project;
  closeButton: (element: React.MouseEvent<HTMLElement>, id: string) => void;
  updateButton: (
    element: React.MouseEvent<HTMLElement>,
    project: Project
  ) => void;
  captionText?: string;
}

const ProjectCard = (props: ProjectCardProps) => {
  const { project } = props;
  const { user } = useAuth();
  
  // TODO: 2) Add useToggle hook to toggle the update button
  // TODO: 2) Add useAuth hook to check the auth state
  const [isVisible, toggle] = useToggle(false);


  const toggleMenu = (element: React.MouseEvent<HTMLElement>) => {
    element.preventDefault();
    element.stopPropagation();
    toggle();
  };

  return (
    <Wrapper href={project.link} target="_blank" rel="noopener">
      <CardWrapper>
        <CardInfo>
          <CardVersion>
            <CardVersionText>{project.version}</CardVersionText>
          </CardVersion>
          {/* TODO: 2) Add Kebab Button only when user is autenticated  */}
          {/* TODO: 2) HINT: To Add 3 dots just do the following
            <KebabButton [whatever you need here]>
              <KebabDot />
              <KebabDot />
              <KebabDot />
            </KebabButton>      
          */}
           {user && (
            <KebabButton
              onClick={(e: React.MouseEvent<HTMLElement>) => toggleMenu(e)}
            >
              <KebabDot />
              <KebabDot />
              <KebabDot />
            </KebabButton>
          )}
        </CardInfo>
        {/* TODO: 2) Add Menu only when user is autenticated and menu is toggled (menu is outside CardInfo) */}

        {user && isVisible && (
          <>
            <MenuDropDownOverlay onClick={toggleMenu} />
            <MenuDropDown>
              <MenuDropDownItem
                isWarning={false}
                onClick={(e: React.MouseEvent<HTMLElement>) =>
                  props.updateButton(e, project)
                }
              >
                Update
              </MenuDropDownItem>
              <MenuDropDownItem
                isWarning={true}
                onClick={(e: React.MouseEvent<HTMLElement>) => {
                  props.closeButton(e, project._id ?? "");
                  toggle();
                }}
              >
                Delete
              </MenuDropDownItem>
            </MenuDropDown>
          </>
        )}
        <CardCaption data-testid="caption">
          {props.captionText ? props.captionText : ""}
        </CardCaption>
        <CardTitle>{project.title}</CardTitle>
        <CardDescription>{project.description}</CardDescription>

        <ProjectTags>
          <TagIconWrapper>
            <TagIcon src={codeIcon} alt="Icon Tag Project" />
          </TagIconWrapper>
          <TagText>{project.tag}</TagText>
        </ProjectTags>
      </CardWrapper>
    </Wrapper>
  );
};

export default ProjectCard;

const CardCaption = styled(SmallText2)``;

 const KebabButton = styled.button`
  border: none;
  background: none;
  margin-left: 10px;
  cursor: pointer;
`;

 const KebabDot = styled.div`
   width: 4px;
   height: 4px;
   border-radius: 2px;
   background: ${themes.light.text1};
   margin: 2px 0;

  @media (prefers-color-scheme: dark) {
     background: ${themes.dark.text1};
   }
 `;

 const MenuDropDown = styled.div`
   position: absolute;
   right: 26px;
   top: 46px;

   border-radius: 2px;
   background-color: ${themes.light.card.backgroundColorFull};
   box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
   display: flex;
   flex-direction: column;
   z-index: 2;

   @media (prefers-color-scheme: dark) {
     background-color: ${themes.dark.card.backgroundColorFull};
   }
 `;

 const MenuDropDownOverlay = styled.div`
   position: absolute;
   width: 100%;
   height: 100%;
   z-index: 2;
   opacity: 0;
 `;

 interface MenuDropDownItemProps {
   isWarning: Boolean;
 }

 const MenuDropDownItem = styled.button<MenuDropDownItemProps>`
   height: 26px;
   width: 100px;
   border: none;
   background: none;
   margin: 6px 0px;
   cursor: pointer;
   color: ${(props) =>
     props.isWarning ? themes.light.warning : themes.light.text1};

   @media (prefers-color-scheme: dark) {
     color: ${(props) =>
      props.isWarning ? themes.light.warning : themes.dark.text1};
   }
`;

const CardInfo = styled.div`
  position: absolute;
  right: 20px;
  top: 20px;
  display: flex;
`;

const CardVersion = styled.div`
  background: rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  padding: 2px 6px;

  @media (prefers-color-scheme: dark) {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const CardVersionText = styled(SmallText2)``;

const CardTitle = styled(H3)`
  font-style: normal;
  word-break: break-word;

  @media (max-width: 450px) {
    font-size: 26px;
  }
`;
const CardDescription = styled(DescriptionCard)``;

const ProjectTags = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: 32px auto;
  align-items: center;
`;

const TagIconWrapper = styled.div`
  display: grid;
  align-items: center;
  width: 32px;
  height: 32px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 50px;
`;

const TagIcon = styled.img`
  margin: auto;
  width: 20px;
  height: 20px;
`;

const TagText = styled(SmallText)`
  line-height: 100%;
`;

const CardWrapper = styled.div`
  ${themes.light.card}
  transition: all 0.8s cubic-bezier(0.075, 0.82, 0.165, 1) 0s;
  position: relative;
  display: grid;
  color: ${themes.light.text1};
  gap: 12px;
  text-align: left;
  width: 280px;
  height: 320px;
  backdrop-filter: blur(40px);
  border-radius: 20px;
  padding: 20px;
  animation: fadein 0.4s;

  @media (prefers-color-scheme: dark) {
    ${themes.dark.card};
    color: ${themes.dark.text1};
  }

  @media (max-width: 450px) {
    width: auto;
    min-width: 240px;
    height: 280px;
  }

  @media (max-width: 700px) {
    min-width: 240px;
    width: auto;
    max-width: 450px;
    height: 280px;
  }

  :hover {
    transform: scale(1.03);
  }
  :active {
    transform: scale(1.01);
  }

  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const Wrapper = styled.a`
  transition: all 0.8s cubic-bezier(0.075, 0.82, 0.165, 1) 0s;
  cursor: pointer;
  width: 280px;
  height: 320px;
  @media (max-width: 450px) {
    width: auto;
    min-width: 240px;
    margin: 0px 0px;
  }

  @media (max-width: 700px) {
    min-width: 240px;
    width: auto;
    max-width: 450px;
    margin: 0px 0px;
  }
`;
