import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BackAllComponent } from './BackOffice/back-all/back-all.component';
import {
  AccountmanagementComponent
} from "./BackOffice/back-all/content-back/accountmanagement/accountmanagement/accountmanagement.component";
import { ProfileComponent } from "./BackOffice/back-all/content-back/accountmanagement/profile/profile.component";
import { AddproductComponent } from './BackOffice/back-all/content-back/store/addproduct/addproduct.component';





import {
  CategoryListComponent
} from './BackOffice/back-all/content-back/store/category/category-list/category-list.component';
import {
  UpdateCategoryComponent
} from './BackOffice/back-all/content-back/store/category/update-category/update-category.component';
import { ProductDetailComponent } from './BackOffice/back-all/content-back/store/product-detail/product-detail.component';
import { ProductListComponent } from './BackOffice/back-all/content-back/store/product-list/product-list.component';
import { UpdateProductComponent } from './BackOffice/back-all/content-back/store/update-product/update-product.component';

import { AddDancestyleToCategoryComponent } from './BackOffice/back-all/content-back/CompetitionM/add-dancestyle-to-category/add-dancestyle-to-category.component';
import { AddcompetitionComponent } from './BackOffice/back-all/content-back/CompetitionM/addcompetition/addcompetition.component';
import { AdddancecategoryandstyleComponent } from './BackOffice/back-all/content-back/CompetitionM/adddancecategoryandstyle/adddancecategoryandstyle.component';
import { AddperformanceComponent } from './BackOffice/back-all/content-back/CompetitionM/addperformance/addperformance.component';
import { AddtownwithvenuesComponent } from './BackOffice/back-all/content-back/CompetitionM/addtownwithvenues/addtownwithvenues.component';
import { CalenderbackcompComponent } from './BackOffice/back-all/content-back/CompetitionM/calenderbackcomp/calenderbackcomp.component';
import { CompetitionDetailsComponent } from './BackOffice/back-all/content-back/CompetitionM/competition-details/competition-details.component';
import { ListCompetitionsComponent } from './BackOffice/back-all/content-back/CompetitionM/list-competitions/list-competitions.component';
import { ListDancecategoriesandstylesComponent } from './BackOffice/back-all/content-back/CompetitionM/list-dancecategoriesandstyles/list-dancecategoriesandstyles.component';
import { ListRegisttrationsComponent } from './BackOffice/back-all/content-back/CompetitionM/list-registtrations/list-registtrations.component';
import { ListTeamsCompComponent } from './BackOffice/back-all/content-back/CompetitionM/list-teams-comp/list-teams-comp.component';
import { ListcompperformancesComponent } from './BackOffice/back-all/content-back/CompetitionM/listcompperformances/listcompperformances.component';
import { ListtownsandvenuesComponent } from './BackOffice/back-all/content-back/CompetitionM/listtownsandvenues/listtownsandvenues.component';
import { RegistrationDetailComponent } from './BackOffice/back-all/content-back/CompetitionM/registration-detail/registration-detail.component';
import { StatcompComponent } from './BackOffice/back-all/content-back/CompetitionM/statcomp/statcomp.component';
import { TeamDancersComponent } from './BackOffice/back-all/content-back/CompetitionM/team-dancers/team-dancers.component';
import { UpdateDancecategoryComponent } from './BackOffice/back-all/content-back/CompetitionM/update-dancecategory/update-dancecategory.component';
import { UpdatecompComponent } from './BackOffice/back-all/content-back/CompetitionM/updatecomp/updatecomp.component';
import {EventComponent} from "./BackOffice/back-all/content-back/accountmanagement/event/event.component";
import {MyeventComponent} from "./BackOffice/back-all/content-back/accountmanagement/myevent/myevent.component";
import {
  TrainingmanagementComponent
} from "./BackOffice/back-all/content-back/trainingmanagement/trainingmanagement/trainingmanagement.component";
import {DancehallComponent} from "./BackOffice/back-all/content-back/trainingmanagement/dancehall/dancehall.component";
import {TrainingComponent} from "./BackOffice/back-all/content-back/trainingmanagement/training/training.component";
import {PostComponent} from "./BackOffice/back-all/content-back/trainingmanagement/post/post.component";
import {AllpostsComponent} from "./BackOffice/back-all/content-back/trainingmanagement/allposts/allposts.component";


import {HomeComponent} from "./BackOffice/back-all/content-back/auth/home/home.component";
import {CoachComponent} from "./BackOffice/back-all/content-back/trainingmanagement/coach/coach.component";
import {PbaComponent} from "./BackOffice/back-all/content-back/trainingmanagement/pba/pba.component";
//import { SeatSelectorComponent } from './BackOffice/back-all/content-back/componentsTickets/seat-selector/seat-selector.component';
import { VenuePlanListComponent } from './BackOffice/back-all/content-back/componentsTickets/venue-plan-list/venue-plan-list.component';

import { PriceListComponent } from './BackOffice/back-all/content-back/componentsTickets/price-list/price-list.component';
import { TicketListComponent } from './BackOffice/back-all/content-back/componentsTickets/ticket-list/ticket-list.component';
import { TicketCardListComponent } from './BackOffice/back-all/content-back/componentsTickets/ticket-card-list/ticket-card-list.component';
import { PursacheTransactionListComponent } from './BackOffice/back-all/content-back/componentsTickets/pursache-transaction-list/pursache-transaction-list.component';
import { TicketScannerListComponent } from './BackOffice/back-all/content-back/componentsTickets/ticket-scanner-list/ticket-scanner-list.component';
import { PlaceListComponent } from './BackOffice/back-all/content-back/componentsTickets/place-list/place-list.component';
import { ReservationPlaceComponent } from './front-office/front-all/content-front/componentsTickets/reservation-place/reservation-place.component';
import { SeatNumbersComponent } from './front-office/front-all/content-front/componentsTickets/seat-numbers/seat-numbers.component';
import { TicketCardComponent } from './front-office/front-all/content-front/componentsTickets/ticket-card/ticket-card.component';


import { ProductListFrontComponent } from './front-office/front-all/content-front/store/product-list-front/product-list-front.component';
import { ShopcartComponent } from './front-office/front-all/content-front/store/shopcart/shopcart.component';
import { ProductSalesComponent } from './BackOffice/back-all/content-back/store/product-sales/product-sales.component';
import { FileUploaderComponent } from './BackOffice/back-all/content-back/store/file-uploader/file-uploader.component';
import { RecommendedProductsComponent } from './front-office/front-all/content-front/store/recommended-products/recommended-products.component';
import { QrScannerComponent } from './front-office/front-all/content-front/componentsTickets/qr-scanner/qr-scanner.component';
import { PurchaseTransaction } from './core/models/purchase-transaction.model';
import { PurchaseTransactionComponent } from './front-office/front-all/content-front/componentsTickets/purchase-transaction/purchase-transaction.component';
import { AddRegistrationComponent } from './front-office/front-all/content-front/CompetitionM/add-registration/add-registration.component';

import { DetailsCompfrontComponent } from './front-office/front-all/content-front/CompetitionM/details-compfront/details-compfront.component';
import { ListCompfrontComponent } from './front-office/front-all/content-front/CompetitionM/list-compfront/list-compfront.component';
import {ListperformanceComponent} from './front-office/front-all/content-front/CompetitionM/listperformance/listperformance.component';




import { SongsdetetctComponent } from './front-office/front-all/content-front/CompetitionM/songsdetetct/songsdetetct.component';
import { MyOrdersComponent } from './front-office/front-all/content-front/store/my-orders/my-orders.component';
import { FrontTemplateComponent } from './front-office/front-template/front-template.component';
import { FrontAllComponent } from './front-office/front-all/front-all.component';
import { CalendercompComponent } from './front-office/front-all/content-front/CompetitionM/calendercomp/calendercomp.component';
import { ConfirmationComponent } from './front-office/front-all/content-front/store/confirmation/confirmation.component';
import { PaymentFormComponent } from './front-office/front-all/content-front/store/payment-form/payment-form.component';
import { StatistiqueDanceStylePerYearsComponent } from './BackOffice/back-all/content-back/componentsTickets/statistique-dance-style-per-years/statistique-dance-style-per-years.component';
import { StatistiqueDanceStylePerMonthComponent } from './BackOffice/back-all/content-back/componentsTickets/statistique-dance-style-per-month/statistique-dance-style-per-month.component';
import { SeatStatisticsComponent } from './BackOffice/back-all/content-back/componentsTickets/seat-statistics/seat-statistics.component';
import { TicketPerCompetitionStatisticsComponent } from './BackOffice/back-all/content-back/componentsTickets/ticket-per-competition-statistics/ticket-per-competition-statistics.component';
import { TicketKpiCopetitionStatComponent } from './BackOffice/back-all/content-back/componentsTickets/ticket-kpi-copetition-stat/ticket-kpi-copetition-stat.component';
import { StaisticMultiViewComponent } from './BackOffice/back-all/content-back/componentsTickets/staistic-multi-view/staistic-multi-view.component';

import { ListVoteComponentF } from './front-office/front-all/content-front/Vote/list-vote/list-vote.component';
import { ListresultFComponent } from './front-office/front-all/content-front/Result/listresultF/listresultF.component';
import { VoteComponent } from './front-office/front-all/content-front/Vote/AjoutVote/vote.component';
import { VoteCalendarComponent } from './front-office/front-all/content-front/Vote/vote-calender/vote-calender.component';
import { VoteStatisticsComponent } from './front-office/front-all/content-front/Vote/vote-statistics/vote-statistics.component';
import { VotePerfComponent } from './front-office/front-all/content-front/Vote/vote-perf/vote-perf.component';

const routes: Routes = [


  {path:'', loadChildren:()=> import('./BackOffice/back-all/content-back/auth/auth.module').then(m => m .AuthModule)},
  { path: 'home', component:HomeComponent,children:[


    { path: 'add-registration/:id', component: AddRegistrationComponent },
    { path: 'list-compfront', component: ListCompfrontComponent },
    { path: 'details-compfront/:id', component: DetailsCompfrontComponent },
    { path: 'calendercomp', component: CalendercompComponent },
    { path: 'listperformances', component: ListperformanceComponent },
    { path: 'Songsdetetct', component: SongsdetetctComponent },

    {path:'produits',component: ProductListFrontComponent},
    { path: 'shopcart', component: ShopcartComponent },
    { path: 'file', component: FileUploaderComponent },
{ path: 'recommended', component: RecommendedProductsComponent },
{ path: 'ReserverPlace', component: ReservationPlaceComponent},
{ path: 'Place', component: SeatNumbersComponent},
{ path: 'ticket-card/:userId', component: TicketCardComponent },
{ path: 'payment', component: PaymentFormComponent },
{ path: 'confirm', component: ConfirmationComponent },
{path:'myorders',component: MyOrdersComponent},


    { path: 'ReserverPlace', component: ReservationPlaceComponent},
    { path: 'Place/:venuePlanId/:competitionId', component: SeatNumbersComponent},
   { path: 'ticket-card/:userId/:competitionId', component: TicketCardComponent },

    { path: 'purchase-transaction', component:PurchaseTransactionComponent  },
    { path: 'QrScanner', component: QrScannerComponent },
    {path: 'my-events', component: MyeventComponent},
  {path: 'training', component: TrainingComponent},
  {path: 'all-post', component: AllpostsComponent},

  {path: 'profile', component: ProfileComponent},


  {path: 'Vote/Ajoutvote/:id', component: VoteComponent},
  {path: 'Result', component: ListresultFComponent},


  { path: 'Vote', component: ListVoteComponentF },
  { path: 'vote-calendar/:performanceId', component: VoteCalendarComponent },

  {path: 'VoteStatistic', component: VoteStatisticsComponent},
  {path: 'Voteperf', component: VotePerfComponent}



    ]},

  {
    path: "admin", component: BackAllComponent, children: [
      {path: 'event-management', component: EventComponent},
      {path: 'products/add', component: AddproductComponent},
      {path: 'products', component: ProductListComponent},
      {path: 'products/update-product/:productId', component: UpdateProductComponent},
      {path: 'products/:productId', component: ProductDetailComponent},
      {path: 'account-management', component: AccountmanagementComponent},
      {path: 'post', component: PbaComponent},


      {path: 'profile', component: ProfileComponent},
      {path: 'training-management', component: TrainingmanagementComponent},
      {path: 'dance-hall-management', component: DancehallComponent},
     // {path: 'training', component: TrainingComponent},
      { path: 'categorys', component: CategoryListComponent },
      { path: 'category/update/:categoryId', component: UpdateCategoryComponent },
      { path: 'ProductSales', component: ProductSalesComponent },
      { path: 'coach-management', component: CoachComponent },


      { path: 'list-registrations', component: ListRegisttrationsComponent },
      { path: 'registration-detail/:registrationId', component: RegistrationDetailComponent },
      { path: 'add-dancecategoryandstyle', component: AdddancecategoryandstyleComponent },
      { path: 'list-dancecategoryandstyle', component: ListDancecategoriesandstylesComponent },
      { path: 'add-dancestyle-to-category/:id', component: AddDancestyleToCategoryComponent },
      { path: 'update-dancecategory/:id', component: UpdateDancecategoryComponent },
      { path: 'add-competition', component: AddcompetitionComponent },
      { path: 'list-comp', component: ListCompetitionsComponent },
      { path: 'comp-details/:id', component: CompetitionDetailsComponent },
      { path: 'update-comp/:id', component: UpdatecompComponent },
      { path: 'list-teams-comp', component: ListTeamsCompComponent },
      { path: 'list-teams-dancers', component: TeamDancersComponent },
      { path: 'calendercompback', component: CalenderbackcompComponent },
      { path: 'add-performance', component: AddperformanceComponent },
      { path: 'add-town-and-venues', component: AddtownwithvenuesComponent },
      { path: 'list-townsandvenues', component: ListtownsandvenuesComponent },
      { path: 'compstat', component: StatcompComponent },



      { path: 'VenuePlan', component: VenuePlanListComponent},
      { path: 'Price', component: PriceListComponent},
      { path: 'Ticket', component: TicketListComponent},
      { path: 'TicketCard', component: TicketCardListComponent},
      { path: 'PurchaseTransaction', component: PursacheTransactionListComponent},
      { path: 'TicketScanner', component: TicketScannerListComponent},
      { path: 'Place', component: PlaceListComponent},

      { path: 'statdancestyleticket', component: StatistiqueDanceStylePerYearsComponent},
      { path: 'statdancestyleticketpermonth', component: StatistiqueDanceStylePerMonthComponent},
      { path: 'seatnumberStat/:venuePlanId', component: SeatStatisticsComponent},
      { path: 'ticketPerCompetitionStat', component: TicketPerCompetitionStatisticsComponent},
      { path: 'CompetitionKPI', component: TicketKpiCopetitionStatComponent},
      { path: 'totStat', component: StaisticMultiViewComponent},


    ]
  }

//{ path: 'refresh', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
